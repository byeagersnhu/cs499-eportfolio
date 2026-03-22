/*
 * animalController.js
 * 
 * Controller functions for handling animal-related API requests.
 * 
 * This controller is used by animalRoutes.js to define API endpoints.
 */

const Animal = require('../models/Animal');

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
