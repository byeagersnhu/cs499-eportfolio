/*
 * Animal Model
 * 
 * Defines the shape of an Animal object as retrned by the backend API
 * 
 */

export interface Animal {
    age_upon_outcome_in_weeks: number;
    animal_id: string;
    animal_type: string;
    breed: string;
    color: string;
    date_of_birth: string;
    datetime: string;
    monthyear: string;
    name: string;
    outcome_subtype: string;
    outcome_type: string;
    sex_upon_outcome: string;
    location_lat: number;
    location_long: number;
    score?: number;          // only present for ranked rescueType search
    rescueTypes: string[];   // always present with applicable rescuetypes. i.g. "water" or "none". 
}