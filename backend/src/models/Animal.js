// Mongoose schema defining the structure of animal documents
const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
    age_upon_outcome_in_weeks: Number,
    animal_id: String,
    animal_type: String,
    breed: String,
    color: String,
    date_of_birth: String,
    datetime: String,
    monthyear: String,
    name: String,
    outcome_subtype: String,
    outcome_type: String,
    sex_upon_outcome: String,
    location_lat: Number,
    location_long: Number
}, {collection: "animals"});

// Export the model for use in controllers and routes
module.exports = mongoose.model("Animals", AnimalSchema);
