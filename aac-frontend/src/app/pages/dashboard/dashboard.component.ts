/*
 * Dashboard Component
 * 
 * This component serves as the central controller for the animal adopion dashboard
 * It coordinates data retrieval, filtering, sorting, pagination, and the map modal. 
 * 
 * This component acts as the main for the frontend UI, delegating display logic
 * to child components such as animal-filter.component, animals-list.component, and 
 * map-modal.component.
 */ 

import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Animal } from "../../models/animal";
import { AnimalService } from "../../services/animal.service";
import { AnimalsListComponent } from "../../components/animals-list/animals-list.component";
import { FormsModule } from "@angular/forms";
import { MapModalComponent } from "../../map-modal/map-modal.component";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AnimalsListComponent,
    MapModalComponent,
    SearchBarComponent
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  // Data Sets.
  
  // Full data set returned from the backend.
  allAnimals: Animal[] = [];
  
  // Search results returned from backend fuzzy search.
  searchResults: Animal[] =[];

  // Paginated subsets for display.
  paginatedAllAnimals: Animal[] = [];
  paginatedSearchResults: Animal[] = [];

  // UI States.

  // Loading indicator for async operations.
  loading = false;

  // Sorting state.
  sortField: keyof Animal = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Pagination state.
  currentPage = 1;
  pageSize = 9;   // 3 cards per row x 3 rows.
  totalPages = 1;
  pageNumbers: number[] = [];

  // Filtering and pagination helpers.
  isLastPage: boolean = false;

  // Map modal state.
  selectedAnimal: Animal | null = null;
  isMapOpen: boolean = false;

  constructor(private animalService: AnimalService) {}

  // OnInit hook.
  // Fetches initial dataset on component load. 
  ngOnInit(): void {
    this.fetchAllAnimals();
  }

  // Fetch all animals from backend and initialize UI state.
  fetchAllAnimals(): void {
    this.loading = true;
    this.animalService.getAllAnimals().subscribe({
      next:animals => {
        this.allAnimals = animals;
        this.currentPage = 1;
        this.applySorting();
        this.updatePaginationAll();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // Perform fuzzy search via backend.
  onSearch(term: string): void {
    const trimmed = term.trim();

    if (!trimmed) {
      this.clearSearch();
      return;
    }

    this.loading = true;

    this.animalService.searchAnimals(trimmed).subscribe({
      next: animals => {
        this.searchResults = animals;
        this.currentPage = 1;
        this.applySorting();
        this.updatePaginationSearch();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // Reset search state and return to all data set. 
  clearSearch(): void {
    this.searchResults = [];
    this.currentPage = 1;
    this.applySorting();
    this.updatePaginationAll();
    this.fetchAllAnimals();
  }

  // Apply sorting to either full data set or search results.
  applySorting(): void {
   // If rescueType results, sort by score DESC
   if (this.searchResults.length > 0 && this.searchResults[0].score != undefined) {
    this.searchResults = [ ... this.searchResults].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    return;
   }

   // Otherwise, normal alphabetical sorting
   const sortFn = (a: Animal, b: Animal) => {
    const field = this.sortField;
    const av = (a[field] || '').toString().toLowerCase();
    const bv = (b[field] || '').toString().toLowerCase();

    if (av < bv) return this.sortDirection == 'asc' ? -1 : 1;
    if (av > bv) return this.sortDirection == 'desc' ? 1 : -1;
    return 0;
   };

   if (this.searchResults.length > 0) {
    this.searchResults = [...this.searchResults].sort(sortFn);
   } else {
    this.allAnimals = [...this.allAnimals].sort(sortFn);
   }
  }

  // Toggle ascending/descending sort direction.
  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection == 'asc' ? 'desc' : 'asc';
    this.applySorting();
    if (this.searchResults.length > 0) {
      this.updatePaginationSearch();
    } else {
      this.updatePaginationAll();
    }
  }

  // Pagination for full data set.
  updatePaginationAll(): void {
    this.totalPages = Math.max(1, Math.ceil(this.allAnimals.length / this.pageSize));
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.isLastPage = this.currentPage >= this.totalPages;

    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedAllAnimals = this.allAnimals.slice(start, start + this.pageSize);
  }

  // Pagination for search results.
  updatePaginationSearch(): void {
    this.totalPages = Math.max(1, Math.ceil(this.searchResults.length / this.pageSize));
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.isLastPage = this.currentPage >= this.totalPages;

    const start = (this.currentPage -1) * this.pageSize;
    this.paginatedSearchResults = this.searchResults.slice(start, start + this.pageSize);
  }

  // Navigate to next page.
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      if (this.searchResults.length > 0) {
        this.updatePaginationSearch();
      } else {
        this.updatePaginationAll();
      }
    }
  }

  // Navigate to previous page.
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.searchResults.length > 0) {
        this.updatePaginationSearch();
      } else {
        this.updatePaginationAll();
      }
    }
  }

  // Navigate to specific page.
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    if (this.searchResults.length > 0) {
      this.updatePaginationSearch();
    } else {
      this.updatePaginationAll();
    }
  }

  // Open map modal for selected animal.
  openMap(animal: Animal): void {
    this.selectedAnimal = animal;
    this.isMapOpen = true;
  }

  // Close map modal.
  closeMap(): void {
    this.isMapOpen = false;
    this.selectedAnimal = null;
  }
}