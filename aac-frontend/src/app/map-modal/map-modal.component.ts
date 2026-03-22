/*
 * MapModalComponent
 * This component displays a Google Map centered on the selected animal's location
 * It is rendered inside a modal overlay controlled by the Dashboard Component.
 * 
 * This component is intentionally lightweight and focused solely on map display.
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { Animal } from '../models/animal';

@Component({
    selector: 'app-map-modal',
    standalone: true,
    imports: [CommonModule, GoogleMapsModule],
    templateUrl: './map-modal.component.html',
    styleUrls: ['./map-modal.component.css']
})

export class MapModalComponent {
    
    // This animal whose location will be displayed on the map
    @Input() animal !: Animal;

    // Emits when the user closes the modal
    @Output() close = new EventEmitter<void>();

    // Google Maps configuration options
    mapOptions: google.maps.MapOptions = {
        zoom: 14,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false
    };

    // Computes the map center based on the selected animal's coordinates.
    // This getter recalculates automatically if the input animal changes.
    get center() {
        return {
            lat: this.animal.location_lat,
            lng: this.animal.location_long
        };
    }
}