/*
 * Dashboard Component
 * 
 * This component serves as the central controller for the animal adopion dashboard
 * It coordinates data retrieval, filtering, sorting, pagination, and the map modal. 
 * 
 * This component acts as the main for the frontend UI, delegating display logic
 * to child components such as animal-filter.component, animals-list.component, and 
 * map-modal.component.
 * */ 

import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Animal } from "../../models/animal";
import { AnimalService } from "../../services/animal.service";
import { AnimalFilterComponent } from "../../components/animal-filter/animal-filter.component";
import { AnimalsListComponent } from "../../components/animals-list/animals-list.component";
import { FormsModule } from "@angular/forms";
import { MapModalComponent } from "../../map-modal/map-modal.component";
import { RescueResult } from "../../models/rescue-result";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    // AnimalFilterComponent,    can be added later. 
    AnimalsListComponent,
    MapModalComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  // Full dataset returned from the backend
  allAnimals: Animal[] = [];

  // Filtered subset of animals (empty when no filter is applied)
  filteredAnimals: Animal[] = [];

  // Sorting state
  sortField: keyof Animal = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination state
  currentPage: number = 1;
  pageSize: number = 9;   // 3 cards per row x 3 rows
  isFiltered: boolean = false;

  // Map modal state
  selectedAnimal: Animal | null = null;
  isMapOpen: boolean = false;

  // Search for subset of animals
  searchResults: (Animal | RescueResult)[] =[];
  isSearching: boolean = false;


  constructor(private animalService: AnimalService) {}

  // OnInit hook
  // Fetches all animals from the backend and applies initial sorting. 
  ngOnInit(): void {
    this.animalService.getAllAnimals().subscribe(data => {
      this.allAnimals = this.sortAnimals(data);
    });
  }

  // Receives filtered results from the filter component.
  // Determines whether filtering is active and resets pagination. 
  updateResults(results: Animal[]): void {
    if (results.length == this.allAnimals.length) {
      // No filters applied - revert to full dataset
      this.isFiltered = false;
      this.filteredAnimals = [];
    }
    else {
      // Filters applied - store sorted filtered results
      this.isFiltered = true;
      this.filteredAnimals = this.sortAnimals(results);
    }

    this.currentPage = 1;   // Reset to first page after filtering.
  }

  // Sorts a list of animals based on the current sort field and direction. 
  sortAnimals(list: Animal[]): Animal[] {
    return [...list].sort((a, b) => {
      const fieldA = (a[this.sortField] || '').toString().toLowerCase();
      const fieldB = (b[this.sortField] || '').toString().toLowerCase();

      if (fieldA < fieldB) return this.sortDirection == 'asc' ? -1 : 1;
      if (fieldA > fieldB) return this.sortDirection == 'asc' ? 1 : -1;
      return 0;
    });
  }

    // Re-applies sorting to both full and filtered lists.
    // Used when the user changes the sort field or direction.
    applySorting(): void {
      this.allAnimals = this.sortAnimals(this.allAnimals);
      this.filteredAnimals = this.sortAnimals(this.filteredAnimals);
      this.currentPage = 1;   // Reset to first page of results. 
    }

    // Toggles between ascending and descending sort order.
    toggleSortDirection(): void {
      this.sortDirection = this.sortDirection == 'asc' ? 'desc' : 'asc';
      this.applySorting();
    }

    // Returns the current page of unfiltered animals.
    get paginatedAllAnimals(): Animal[] {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.allAnimals.slice(start, start + this.pageSize);
    }

    // Returns the current page of filtered animals.
    get paginatedFilteredAnimals(): Animal[] {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredAnimals.slice(start, start + this.pageSize);
    }

    // Returns the current page of searched animals.
    get paginatedSearchResults(): (Animal | RescueResult)[] {
      const start = (this.currentPage -1) * this.pageSize;
      return this.searchResults.slice(start, start + this.pageSize)
    }

    // Determines whether the user is on the last page of results. 
    get isLastPage(): boolean {
      let activeList: (Animal | RescueResult)[];

      if(this.searchResults.length > 0) {
        activeList = this.searchResults;
      } else if (this.filteredAnimals.length > 0) {
        activeList = this.filteredAnimals;
      } else {
        activeList = this.allAnimals;
      }

      return this.currentPage * this.pageSize >= activeList.length;
    }

    // Calculates the total number of pages based on active dataset. 
    get totalPages(): number { 
      let activeList: (Animal | RescueResult)[];

      if (this.searchResults.length > 0) {
        activeList = this.searchResults;
      } else if (this.filteredAnimals.length > 0) {
        activeList = this.filteredAnimals;
      } else {
        activeList = this.allAnimals;
      }

      return Math.ceil(activeList.length / this.pageSize);
    }

    // Generates an array of page numbers for pagination controls
    get pageNumbers(): number[] {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    // Navigates directly to a specific page.
    goToPage(page: number): void {
      this.currentPage = page;
    }

    // Advances to the next page if available.
    nextPage(): void {
      if (!this.isLastPage){
        this.currentPage++;
      }
    }

    // Moves to the previous page if available.
    prevPage(): void {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }

    // Opens the map modal for the selected animal. 
    openMap(animal: Animal | RescueResult): void {
      if (!('location_lat' in animal)) return;   // exit if results have no map data. 
      this.selectedAnimal = animal;
      this.isMapOpen = true;
    }

    // Closes the map modal and clears the selected animal. 
    closeMap(): void {
      this.isMapOpen = false;
      this.selectedAnimal = null; 
    }

    // Search method
    onSearch(query: string): void {
      if (!query.trim()) {
        this.searchResults = [];
        this.currentPage = 1;
        return;
      }

      // Detect rescue type keywords
      const rescueKeywords = ['water', 'mountain', 'disaster']
      const rescueType = rescueKeywords.includes(query.toLowerCase())
        ? query.toLowerCase()
        : undefined;

      this.isSearching = true;

      this.animalService.searchAnimals(query, rescueType).subscribe({
        next: (results) => {

          // RescueType used disable sort and hide low-scoring animals
          if (rescueType) {
            const threshold = 50;    // minimum score to appear.
            this.searchResults = results.filter(a => a.score >= threshold);
          }
          // Normal search used apply sort. 
          else {
            this.searchResults = this.sortAnimals(results);
          }
          this.isSearching = false;
          this.currentPage = 1;
          this.filteredAnimals = [];  // Disable filters during search
          this.isFiltered = false;
        },
        error: (err) => {
          console.error('Search error: ', err);
          this.isSearching = false;
        }
      });
    }

    clearSearch(): void {
      this.searchResults = [];
      this.currentPage = 1;
    }
}
