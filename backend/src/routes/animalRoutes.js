/*
 * animalRoutes.js
 * 
 * Defines API endpoints for animal-related operations.
 * 
 * This router is mounted in server.js under /api/animals
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/animalController');

// GET all animals
// Returns all animals in the database
router.get('/', controller.getAllAnimals);

// POST filtered animals based on request body criteria
// Returns all animals filtered by criteria in the request body.
router.post('/filter', controller.filterAnimals);

module.exports = router;