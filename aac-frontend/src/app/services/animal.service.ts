/*
 * Animal Service
 * 
 * This service acts as the communication layer between the Angular frontend.
 * and the Express/MongoDB backend. It provides methods for retrieving all 
 * animals and filtering animals based on user-defined criteria.
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

  // Retrieves the full list of animals from the backend.
  // Returns observable<Animal[]> async stream of animal data.
  getAllAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  // Sends filter criteria to the backend and retrns matching animals.
  // Parameter criteria - object containing filter fields.
  // Returns Observable<Animal[]> -filtered results. 
  filterAnimals(criteria: any): Observable<Animal[]> {
    return this.http.post<Animal[]>(`${this.apiUrl}/filter`, criteria);
  }
}