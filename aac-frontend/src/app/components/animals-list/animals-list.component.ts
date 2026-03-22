/*
 * Animal List Component
 * 
 * This presentational component is responsible for displaying a list of animals.
 * It receives animal data from the parent (DashboardComponent) and emits an event
 * when a user selects an animal card.
 * 
 */

import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Animal } from "../../models/animal";


@Component({
  selector: 'app-animals-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animals-list.component.html'
})

export class AnimalsListComponent {
  
  // Array of animals to display
  @Input() animals: Animal[] = [];
  
  // Loading state for showing a spinner 
  @Input() loading: boolean = false;

  // Emits the selected animal when a card is clicked
  @Output() select = new EventEmitter<Animal>();

  // Handles click events on an animal card. 
  // Parameter animal - the animal that was clicked. 
  onCardClick(animal: Animal): void {
    this.select.emit(animal);
  }
}