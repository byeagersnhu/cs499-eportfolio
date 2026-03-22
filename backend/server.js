/*
 * server.js
 * 
 * Entry point for the backend API Server.
 */

// Load environment variables from .env
require('dotenv').config();

// Core server setup for the backend API
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Route handlers
const animalRoutes = require('./src/routes/animalRoutes');

const app = express();
app.use(cors());           // Enable Cross-Origin Resource Sharing
app.use(express.json());   // Parse incoming JSON requests 

// Connect to MongoDB
connectDB();

// Register API routes
app.use('/api/animals', animalRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});