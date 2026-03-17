// Controller functions for handling animal-related requests
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

// Return animals matching filter criteria from the request body
exports.filterAnimals = async (req, res) => {
    try {
        const query = req.body;   // Dynamic filtering based on provided fields
        const animals = await Animal.find(query);
        res.json(animals);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
