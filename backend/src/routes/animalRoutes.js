/*
 * animalRoutes.js
 * 
 * Defines API endpoints for animal-related operations.
 * 
 * This router is mounted in server.js under /api/animals
 */

const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

// GET all animals
// Returns all animals in the database
router.get('/', animalController.getAllAnimals);

// Get searched animals
// Full field search with optional rescue-type ranking
router.get('/search', animalController.searchAnimals);

// POST filtered animals based on request body criteria
// Returns all animals filtered by criteria in the request body.
router.post('/filter', animalController.filterAnimals);

module.exports = router;