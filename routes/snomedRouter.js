const express = require('express');
const { searchSnomedTerm } = require('../controllers/snomedController'); // Import the controller function

const router = express.Router();

// Define the route for searching SNOMED terms
router.get('/search/:searchTerm', searchSnomedTerm);

module.exports = router;
