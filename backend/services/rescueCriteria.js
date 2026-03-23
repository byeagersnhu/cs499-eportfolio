/*
 * RescueCriteria.js
 *
 * This defines the criteria the perfered breeds, sex, and age of dogs for each rescue type. 
 */

const rescureCriteria = {
    water: {
        preferedBreeds: [
            "Labrador Retriever Mix",
            "Chesapeake Bay Retriever",
            "Newfoundland"
        ],
        preferredSex: "Intact Female",
        minAgeWeeks: 26,
        maxAgeWeeks: 156
    },

    mountain: {
        preferedBreeds: [
            "German Shepherd",
            "Alaskan Malamute",
            "Old English Sheepdog",
            "Siberian Husky",
            "Rottweiler"
        ],
        preferredSex: "Intact Male",
        minAgeWeeks: 26,
        maxAgeWeeks: 156
    },

    disaster: {
        preferedBreeds: [
            "Doberman Pinscher",
            "German Shepherd",
            "Golden Retriever",
            "Bloodhound",
            "Rottweiler"
        ],
        preferredSex: "Intact Male",
        minAgeWeeks: 26,
        maxAgeWeeks: 300
    }
};

modlue.exports = rescureCriteria;