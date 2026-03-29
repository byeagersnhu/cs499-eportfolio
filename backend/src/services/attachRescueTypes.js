/*
 * attachRescueTypes.js
 * 
 * Enriches each animal object with a rescueTypes array.
 * Uses getApplicableRescueTypes from rescueRanker.
 * 
 * This keeps the frontend simple and ensures consistent data shape.
 */

const { getApplicableRescueTypes } = require('./rescueRanker');
const rescueCriteria = require('./rescueCriteria');

// Attach rescueTypes to an array of animals.
// Returns a NEW array of enriched animal objects. 
function attachRescueTypes(animals, threshold = 75) {
    if (!Array.isArray(animals)) {
        throw new Error("attachResue Types expected an array of animals");
    }

    return animals.map(a => {
        // Convert Mongoose docs to plain objects safely when needed.
        const animalObj = a.toObject ? a.toObject() : a;

        return {
            ...animalObj,
            rescueTypes: getApplicableRescueTypes(animalObj, rescueCriteria, threshold)
        };
    });
}

module.exports =  attachRescueTypes;