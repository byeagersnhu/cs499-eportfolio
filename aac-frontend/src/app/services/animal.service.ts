/*
 * Animal Service
 * 
 * Centralized service responsible for all communication
 * between the Angular frontend and the backend API
 * 
 * 
 * This service contain No UI logic. it simply exposes
 * clean, reusable methods for components to consume.
 **/

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Animal } from "../models/animal";

@Injectable({
  providedIn: 'root'  
})

export class AnimalService {

  // Base URL for all animal-related API endpoints
  private apiUrl = 'http://localhost:5000/api/animals';

  constructor(private http: HttpClient) {}

  // Fetches the full data set of animals from the backend
  // Returns observable<Animal[]> async stream of animal data.
  getAllAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  // Performs a fuzzy search on name, breed, or animal_type
  // Parameter term - search string
  searchAnimals(query: string, rescueType ?: string) {
    const params: any = { q: query };
    if (rescueType) params.rescueType = rescueType;

    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }

  // Retrieves animals ranked by a specific rescueType.
  // Used when the user explicitly selects a rescue category.
  // parameter rescueType - "water" | "mountian" | "disaster"
  // No longer used, candidate for deletion. 
  searchByRescueType(rescueType: string): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${this.apiUrl}/search?rescueType=${rescueType}`);
  }
}