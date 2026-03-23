/*
 * RescueRanker.js
 * 
 * This module is designed to return a score of each animal that meets 
 * search criteria based on rescue type.
 */

const rescueCriteria = require("./rescueCriteria");

function rankAnimals(animals, rescueType) {
    const criteria = rescureCriteria[rescueType];
    if(!criteria) return animals;    // Fallback

    const midpointAge = (criteria.minAgeWeeks + criteria.maxAgeWeeks) / 2;

    const scored = animals.map(animal => {
        let score = 0;

        // Breed scoring
        if (criteria.preferredBreeds.includes(animal.breed)) {
            score += 50;
        } else {
            score += 10;
        }

        // Age scoring
        const ageDiff = Math.abs(animal.age_upon_outcome_in_weeks - midpointage);
        score += Math.max(0, 30-ageDiff);

        return { animal, score };
    });

    // Sort by score descending
    return scored.sort((a, b) => b.score - a.score);

}

modlue.exports = rankAnimals;