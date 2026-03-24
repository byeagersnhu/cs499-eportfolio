/*
 * searchAnimal.js
 * 
 * This module is designed to enable fuzzy search across MongoDB.
 */
const Animal = require("../models/Animal");
const { fuzzy } = require("../utils/fuzzy");

const searchAnimalsService = async (query) => {
    
    if (!query || query.trim() == "") {
        return await Animal.find({});
    }

    const q = query.trim();

    return await Animal.find({
        $or: [
            { animal_id: fuzzy(q) },
            { animal_type: fuzzy(q) },
            { name: fuzzy(q) },
            { breed: fuzzy(q) },
            { color: fuzzy(q) },
            { sex_upon_outcome: fuzzy(q) },
            { outcome_type: fuzzy(q) },
            { outcome_subtype: fuzzy(q) },
            { monthyear: fuzzy(q) },
            { datetime: fuzzy(q) },
        ]
    });
};

module.exports = searchAnimalsService;