/*
 * SearchBarComponent
 * 
 * Standalone UI component responsible for capturing user
 * search input and emitting search events upward to the
 * DashboardComponent.
 */

import { Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [CommonModule, FormsModule ],
    templateUrl: './search-bar.component.html',
    styleUrls: [ './search-bar.component.css']
})

export class SearchBarComponent {
    
    // Emits the current search term to the parent component.
    @Output() search = new EventEmitter<string>();

    // Two-way bound search term for the input field.
    term: string ='';

    // Emits the trimed search term upward so the dashboard 
    // can perform fuzzy or rescue-type searches.
    onInput(): void {
        this.search.emit(this.term.trim());
    }

    // Resets the search bar and notifies the parent component
    // that the search has been cleared.
    clear(): void {
        this.term = '';
        this.search.emit('');
    }
}