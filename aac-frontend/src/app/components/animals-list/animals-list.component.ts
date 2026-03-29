/*
 * Animal List Component
 * 
 * This presentational component is responsible for displaying 
 * a list of animals.This component is intentionally kept 
 * stateless and UI-focused.
 * 
 * all data management is handled by DashboardComponent,
 * keeping this component clean, reusable, and predictable.
 */

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Animal } from "../../models/animal";

@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.css']
})

export class AnimalsListComponent {
  // Inputs

  // Array of animals to display
  @Input() animals: Animal[] = [];
  
  // Loading state for showing a spinner 
  @Input() loading = false;

  // Outputs

  // Emits the selected animal when a card is clicked
  @Output() select = new EventEmitter<Animal>();

  // Handles click events on an animal card. 
  // Parameter animal - the animal that was clicked. 
  onCardClick(animal: Animal): void {
    this.select.emit(animal);
  }
}