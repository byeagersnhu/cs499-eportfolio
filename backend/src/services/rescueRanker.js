/*
 * RescueRanker.js
 * 
 * Cenralized scoring engine for rescue-type suitability.
 * 
 * this module ensures all scoring logic is consistent, reusable,
 * and easy to maintian as rescue criteria evolve.
 */

const rescueCriteria = require("./rescueCriteria")

// Score each animal for ONE rescue type.
function scoreAnimalForRescueType(animal, rescueType) {
    const criteria = rescueCriteria[rescueType];
    if(!criteria) return 0;

    let score = 0;

    // Breed scoring
    const preferredBreeds = criteria.preferredBreeds || [];
    if (preferredBreeds.includes(animal.breed)) {
        score += 150;
    } else {
        score += 10;
    }

    // Sex scoring
    if (animal.sex_upon_outcome == criteria.preferredSex) {
        score += 40;
    }

    // Age scoring
    const midpointAge = (criteria.minAgeWeeks + criteria.maxAgeWeeks) / 2;
    const ageWeeks = animal.age_upon_outcome_in_weeks ?? midpointAge;
    const ageDiff = Math.abs(ageWeeks - midpointAge);
    score += Math.max(0, 60 - ageDiff);

    // Species scoring
    if (!animal.animal_type) {
        score -= 50;
    } else if (animal.animal_type.toLowerCase() == "dog") {
        score += 50;
    } else {
        score -= 200;
    }

    return score;
}

// Determine which rescue types an animal qualifies for.
// Returns an array of rescue types OR ["none"] if no threshold is met.
function getApplicableRescueTypes(animal, criteria = rescueCriteria, threshold = 75) {
    const types = [];

    for (const rescueType in criteria) {
        const score = scoreAnimalForRescueType(animal, rescueType);
        if (score >= threshold) {
            types.push(rescueType);
        }
    }

    // If no rescue types qualify(all are below threshold), return "none".
    return types.length > 0 ?types : ["none"];
}

// Rank a List of animals for a specific rescue type.
// Used only when the user explicitly searches for rescueType (i.e. Water).

function rankAnimals(animals, rescueType) {
    const criteria = rescueCriteria[rescueType];
    if(!criteria) return animals;

    const scored = animals.map(animal => {
        const score = scoreAnimalForRescueType(animal, rescueType);
        return { animal, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored;
}

module.exports = {
    scoreAnimalForRescueType,
    getApplicableRescueTypes,
    rankAnimals
};