/*
 * NavBarComponent
 * 
 * Global navigation bar displayed across the entire application.
 * 
 * All routing logic is handled by Angular's RouterModuler.
 */
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  // Intentionally empty, this component is purely presentational. 
}