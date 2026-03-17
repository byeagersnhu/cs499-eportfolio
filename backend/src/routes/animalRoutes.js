// Defines API endpoints for animal data
const express = require('express');
const router = express.Router();
const controller = require('../controllers/animalController');

// GET all animals
router.get('/', controller.getAllAnimals);

// POST filtered animals based on request body criteria
router.post('/filter', controller.filterAnimals);

module.exports = router;