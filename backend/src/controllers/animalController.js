/*
 * animalController.js
 * 
 * Handles all animal-related API endpoints
 * 
 * This controller delegates scoring logic to attachRescueTypes
 * and keeps endpoint logic clean and maintainable.
 */

const Animal = require('../models/Animal');
const { rankAnimals, getApplicableRescueTypes } = require('../services/rescueRanker');
const searchAnimal = require('../services/searchAnimal');
const rescueCriteria = require('../services/rescueCriteria');
const attachRescueTypes = require('../services/attachRescueTypes');


// GET all animals
exports.getAllAnimals = async (req, res) => {
    try {
        const animals = await Animal.find({});
        const enriched = attachRescueTypes(animals);
        res.json(enriched);
    } catch (error) {
        console.error("Error in getAllAnimals: ", error);
        res.status(500).json({ error: "Server error" });
    }
};

// SEARCH Fuzzy search + rescue_type ranking
exports.searchAnimals = async (req, res) => {
    try {
        const q = (req.query.q || "").trim();
        const rescueType = (req.query.rescueType || "").trim();

        // RescueType search. Ignores fuzzy search, rank All animals
        if (rescueType || ["water", "mountain", "disaster"].includes(q.toLowerCase())) {
            const type = rescueType || q.toLowerCase();

            const animals = await Animal.find({});
            const scored = rankAnimals(animals, type);

            // Flatten ranked results and attach rescueTypes
            const flattened = scored.map(entry => {
                const animalObj = entry.animal.toObject ? entry.animal.toObject() : entry.animal;
                return {
                    ...animalObj,
                    score: entry.score
                };
            });
            
            const enriched = attachRescueTypes(flattened);
            return res.json(enriched);
        }

        // Normal fuzzy search
        if (q.length > 0) {
            const regex = new RegExp(`^${q}`, "i");

            const animals = await Animal.find({
                $or: [
                    { name: regex },
                    { breed: regex },
                    { animal_type: regex },
                    { sex_upon_outcome: regex }
                ]
            });

            const enriched = attachRescueTypes(animals);
            return res.json(enriched);
        }

        // No search, return all animals
        const animals = await Animal.find({});
        const enriched = attachRescueTypes(animals);
        res.json(enriched);

    } catch (error) {
        console.error("Error in searchAnimals: ", error);
        res.status(500).json({ error: "Server Error" });
    }
};