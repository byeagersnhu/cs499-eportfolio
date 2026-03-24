/*
 * RescueRanker.js
 * 
 * High-impact ranking engine for rescure-type searches.
 * Scores animals based on breed, sex, age, and species relevance.
 */

const rescueCriteria = require("./rescueCriteria")

function rankAnimals(animals, rescueType) {
    const criteria = rescueCriteria[rescueType];
    if (!criteria) return animals;   // Invalid rescueType return unchanged

    const midpointAge = (criteria.minAgeWeeks + criteria.maxAgeWeeks) / 2;

    const scored = animals.map(animal => {
        let score = 0;

        // Breed scoring
        const preferredBreeds = criteria.preferredBreeds || [];

        if (preferredBreeds.includes(animal.breed)) {
            score += 150;   // Strong boost for preferred breeds
        } else {
            score += 10;    // Minimal baseline for non-preferred breeds
        }

        // Sex scoring
        if (animal.sex_upon_outcome == criteria.preferredSex) {
            score += 40;
        }

        // Age scoring
        const ageWeeks = animal.age_upon_outcome_in_weeks ?? midpointAge;
        const ageDiff = Math.abs(ageWeeks - midpointAge);

        // Max 60 points, decreasing as age deviates from midpoint
        score += Math.max(0, 60 - ageDiff);

        // Species scoring
        if (!animal.animal_type) {
            score -= 50;    // Unknown species = penalize
        } else if (animal.animal_type.toLowerCase() == "dog") {
            score += 50;    // Dogs get a baseline boost.
        } else {
            score -= 200;   // All other animals = penalize
        }

        // Return scored entry
        return { animal, score };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    // Return animals only
    return scored;
}

module.exports = rankAnimals;