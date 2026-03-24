/*
 * RescueCriteria.js
 *
 * This module defines the criteria for the perfered breeds, sex, and age of dogs for each rescue type. 
 */

const rescueCriteria = {
    water: {
        preferredBreeds: [
            "Labrador Retriever Mix",
            "Labrador Retriever",
            "Chesapeake Bay Retriever",
            "Newfoundland",
            "Golden Retriever Mix"
        ],
        preferredSex: "Intact Female",
        minAgeWeeks: 26,
        maxAgeWeeks: 156
    },

    mountain: {
        preferredBreeds: [
            "German Shepherd",
            "German Shepherd Mix",
            "Alaskan Malamute",
            "Old English Sheepdog",
            "Siberian Husky",
            "Husky",
            "Husky Mix",
            "Rottweiler"
        ],
        preferredSex: "Intact Male",
        minAgeWeeks: 26,
        maxAgeWeeks: 156
    },

    disaster: {
        preferredBreeds: [
            "Doberman Pinscher",
            "German Shepherd",
            "German Shepherd",
            "Golden Retriever",
            "Bloodhound",
            "Rottweiler",
            "Border Collie",
            "Australian Shepherd",
            "Australian Cattle Dog"
        ],
        preferredSex: "Intact Male",
        minAgeWeeks: 26,
        maxAgeWeeks: 300
    }
};

module.exports = rescueCriteria;