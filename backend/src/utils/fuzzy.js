/*
 * fuzzy.js
 * 
 * This util allows for fuzzy search across the MongoDB
 */

const fuzzy = (query) => ({
    $regex: query,
    $options: "i"   // case-insensitive
});

module.exports = { fuzzy };