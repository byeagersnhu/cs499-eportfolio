/*
 * Animal Filter Component
 * 
 * This component provides filtering controls for the dashboard. It allows the user
 * to filter animals by type and emits the filtered results back to the parent.
 * DashboardComponent
 * 
 * This component contains only UI-level filtering logic; all heavy lifting
 * (sorting, pagination, state management) is handled by the dashboard.
 */

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AnimalService } from "../../services/animal.service";
import { Animal } from "../../models/animal";

@Component({
  selector: 'app-animal-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './animal-filter.component.html'
})

export class AnimalFilterComponent {

  // Full list of animlas passed in from the dashboard
  @Input() allAnimals: Animal[] =[];

  // Emits filtered results back to the dashboard
  @Output() results = new EventEmitter<Animal[]>();
  
  // User-selected filter value (animal type) 
  filterType: string = '';

  constructor(private animalService: AnimalService) {}

  // Applies the filter based on the current filterType.
  // If no filter is entered, emit the full list.
  applyFilter(): void {
    if (this.filtersAreBlank()) {
      this.results.emit(this.allAnimals);
      return;
    }

    // Normalize filter input for case-insensitive matching
    const criteria = { animal_type: this.filterType.toLowerCase() };

    this.animalService.filterAnimals(criteria).subscribe(data => {
      this.results.emit(data);
    })
  }

  // Determines whether the filter input is empty or whitespace.
  private filtersAreBlank(): boolean {
    return !this.filterType || this.filterType.trim() == '';
  }

  // Clears all filters and restores the full dataset.
  clearFilters(): void {
    this.filterType = '';
    this.results.emit(this.allAnimals);   // Reset to full list.
  }
}