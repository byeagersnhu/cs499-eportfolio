/*
 * animalController.js
 * 
 * Controller functions for handling animal-related API requests.
 * 
 * This controller is used by animalRoutes.js to define API endpoints.
 */

const Animal = require('../models/Animal');
const rankAnimals = require('../services/rescueRanker');

// Return all animals in the database
exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find({});
        res.json(animals);
    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
};

/* Return animals matching filter criteria from the request body
 * Currently supports case-insensitive filtering by animal_type.
 *
 * Enhancement two will expand this filtering to include more types. 
 */

exports.filterAnimals = async (req, res) => {
    try {
        const query = req.body;   // Dynamic filtering based on provided fields
        
        // Case-insensitive match on animal_type.
        const animals = await Animal.find({
            animal_type: { $regex: new RegExp(query.animal_type, 'i') }
        });
        res.json(animals);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Full search + optional rescure-type ranking
// for Enhancement two
exports.searchAnimals = async (req, res) => {
    try {
        const { query, rescueType } = req.query;

        // Fetch all animals
        let animals = await Animal.find({});

        // Apply full-field search
        const results = animals.filter(animal => matchesQuery(animal, query));

        // Apply rescue-type ranking 
        let finalResults = results;
        if (rescueType) {
            finalResults = rankAnimals(results, recueType);
        }

        res.json(finalResults);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

function matchesQuery(animal, query) {
    if(!query) return true;
    const q = query.toLowerCase();

    const fields = [
        animal.age_upon_outcome_in_weeks?.toString();
        animal.animal_id,
        animal.animal_type,
        animal.breed,
        animal.color,
        animal.date_of_birth,
        animal.datetime,
        animal.monthyear,
        animal.name,
        animal.outcome_subtype,
        animal.sex_upon_outcome,
        animal.location_lat?.toString(),
        animal.location_long?.toString()
    ];

    return fields
        .filter(Boolean)
        .some(f => f.toLowerCase().includes(q));
}
