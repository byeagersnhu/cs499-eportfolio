/*
 * animalController.js
 * 
 * Controller functions for handling animal-related API requests.
 * Enhancement One: getAllAnimals, filterAnimals
 * Enhancement Two: searchAnimals (fuzzy serach + ranking)
 * This controller is used by animalRoutes.js to define API endpoints.
 */

const Animal = require('../models/Animal');
const rankAnimals = require('../services/rescueRanker');
const searchAnimal = require('../services/searchAnimal');

// Return all animals
exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find({});
        res.json(animals);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Filter animals by criteria
exports.filterAnimals = async (req, res) => {
    try {
        const query = req.body;

        const animals = await Animal.find({
            animal_type: { $regex: new RegExp(query.animal_type, 'i') }
        });

        res.json(animals);
    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
};

// Fuzzy search + rescue_type ranking
exports.searchAnimals = async (req, res) => {
    try {
        const { query, rescueType } = req.query;

        // RescueType search. Ignores fuzzy search, rank All animals
        if (rescueType) {
            const allAnimals = await Animal.find({});
            const scored = rankAnimals(allAnimals, rescueType);

            // Flatten the structure so frontend gets;
            // { name, breed, animal_type, score }
            const flattened = scored.map(entry => ({
                ...entry.animal.toObject(),
                score: entry.score
            }));
            
            return res.json(flattened);
        }

        // Normal fuzzy search
        const animals = await searchAnimal(query);
        return res.json(animals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};