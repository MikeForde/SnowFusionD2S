const express = require('express');
const {
    searchSnomedTerm,
    getSnomedDescriptionsByConceptId,
    getParentCodes,
    getChildCodes,
    searchSnomedTermType
} = require('../controllers/snomedController');

const router = express.Router();

router.get('/search/:searchTerm', searchSnomedTerm);
router.get('/descriptions/:conceptId', getSnomedDescriptionsByConceptId);
router.get('/parents/:conceptId', getParentCodes);
router.get('/children/:conceptId', getChildCodes);
router.get('/search-term-only/:searchTerm', searchSnomedTermType);

module.exports = router;
