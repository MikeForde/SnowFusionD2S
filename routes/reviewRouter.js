const db = require('../models'); // Import the models
const express = require('express');
const router = express.Router();

// Function to get the SNOMED Parent term
const getSNOMEDParentTerm = async (snomedParent) => {
    // First, check if the concept is active in any dataset
    const isActiveConcept = await isConceptActiveInAnyDataset(snomedParent);
    if (!isActiveConcept) {
        return null; // Concept is not active in any dataset
    }

    // Fetch active descriptions from all datasets
    const descriptions = await Promise.all([
        db.SnomedIntDescription.findOne({
            where: { conceptId: snomedParent, active: true, typeId: '900000000000003001' },
            attributes: ['term'],
        }),
        db.SnomedUKDescription.findOne({
            where: { conceptId: snomedParent, active: true, typeId: '900000000000003001' },
            attributes: ['term'],
        }),
        db.SnomedDMSDescription.findOne({
            where: { conceptId: snomedParent, active: true, typeId: '900000000000003001' },
            attributes: ['term'],
        }),
    ]);

    // Find the first available active term
    const parentTerm = descriptions.find(desc => desc !== null);

    return parentTerm ? parentTerm.term : null; // Return the term or null if not found
};

const isConceptActiveInAnyDataset = async (conceptId) => {
    const intConcept = await db.SnomedIntConcept.findOne({ where: { id: conceptId, active: true } });
    if (intConcept) return true;

    const ukConcept = await db.SnomedUKConcept.findOne({ where: { id: conceptId, active: true } });
    if (ukConcept) return true;

    const dmsConcept = await db.SnomedDMSConcept.findOne({ where: { id: conceptId, active: true } });
    if (dmsConcept) return true;

    return false;
};


// Search reviews and include SNOMEDParentTerm if applicable
router.get('/search/:searchTerm', async (req, res) => {
    const { searchTerm } = req.params;

    console.log("Received search term:", searchTerm);

    try {
        const reviews = await db.DMICPReadReview.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { DMICPCode: { [db.Sequelize.Op.like]: `%${searchTerm}%` } },
                    { Description: { [db.Sequelize.Op.like]: `%${searchTerm}%` } }
                ]
            }
        });

        console.log("Fetched reviews:", reviews);

        // Fetch the SNOMEDParentTerm for each review that has a SNOMEDParent
        const enhancedReviews = await Promise.all(reviews.map(async (review) => {
            const reviewData = review.toJSON(); // Convert Sequelize instance to plain JSON
            if (review.SNOMEDParent) {
                const snomedParentTerm = await getSNOMEDParentTerm(review.SNOMEDParent);
                reviewData.SNOMEDParentTerm = snomedParentTerm; // Add SNOMEDParentTerm to the review data
            }
            return reviewData;
        }));

        res.json(enhancedReviews); // Return the reviews with the SNOMEDParentTerm included
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching.' });
        console.error("Error:", error);
    }
});

router.get('/searchBySNOMEDCode/:snomedCode', async (req, res) => {
    const { snomedCode } = req.params;

    try {
        const reviews = await db.DMICPReadReview.findAll({
            where: {
                SNOMEDCode: snomedCode
            }
        });

        // Fetch the SNOMEDParentTerm for each review that has a SNOMEDParent
        const enhancedReviews = await Promise.all(reviews.map(async (review) => {
            const reviewData = review.toJSON(); // Convert Sequelize instance to plain JSON
            if (review.SNOMEDParent) {
                const snomedParentTerm = await getSNOMEDParentTerm(review.SNOMEDParent);
                reviewData.SNOMEDParentTerm = snomedParentTerm; // Add SNOMEDParentTerm to the review data
            }
            return reviewData;
        }));
        res.json(enhancedReviews);
    } catch (error) {
        console.error('Error fetching reviews by SNOMEDCode:', error);
        res.status(500).json({ error: 'An error occurred while searching by SNOMEDCode.' });
    }
});

const getDMICPReadReviewsByDecision = async (req, res) => {
    try {
        const reviews = await db.DMICPReadReview.findAll({
            where: { Decision: 'DMSCreate' },
            attributes: [
                'id',
                'Drop',
                'DMICPCode',
                'Description',
                'FSNType',
                'Parent',
                'Parent_Term',
                'Purpose',
                'NewDescription',
                'ManualMapCode',
                'ManualMapFSN',
                'APIMapCode',
                'APIMapTerm',
                'SNOMEDCode',
                'SNOMEDParent',
                'TemplateNames',
                'DocumentNames',
                'SearchNames',
                'UsageCount',
                'Cat2' // Include any additional fields required for rendering
            ]
        });
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching DMSCreate reviews:', error);
        res.status(500).json({ error: 'An error occurred while fetching reviews' });
    }
};

// In your routes file (e.g., readReviewRoutes.js)
router.get('/decision/:decision', getDMICPReadReviewsByDecision);

const getDMICPReadReviewsByMapDecision = async (req, res) => {
    // get where Decision = APIMap or ManualMap
    try {
        const reviews = await db.DMICPReadReview.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { Decision: 'APIMap' },
                    { Decision: 'ManualMap' }
                ]
            },
            attributes: [
                'id',
                'Drop',
                'Decision',
                'DMICPCode',
                'Description',
                'FSNType',
                'Parent',
                'Parent_Term',
                'Purpose',
                'NewDescription',
                'ManualMapCode',
                'ManualMapFSN',
                'APIMapCode',
                'APIMapTerm',
                'SNOMEDCode',
                'SNOMEDParent',
                'TemplateNames',
                'DocumentNames',
                'SearchNames',
                'UsageCount',
                'Cat2' // Include any additional fields required for rendering
            ]
        });
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching DMSMap reviews:', error);
        res.status(500).json({ error: 'An error occurred while fetching reviews' });
    }
}

// In your controller (e.g., readReviewController.js)
router.get('/mapdecision/', getDMICPReadReviewsByMapDecision);

// In your controller (e.g., readReviewController.js)
const getDMICPReadReviewsByInactivateDecision = async (req, res) => {
    try {
        const reviews = await db.DMICPReadReview.findAll({
            where: {
                Decision: 'Inactivate'
            },
            attributes: [
                'id',
                'Drop',
                'Decision',
                'DMICPCode',
                'Description',
                'NewDescription',
                'Parent',
                'Parent_Term',
                'Purpose',
                'SNOMEDCode',
                'SNOMEDParent',
                'TemplateNames',
                'DocumentNames',
                'SearchNames',
                'UsageCount',
                'Cat2' // Include any additional fields required for rendering
            ]
        });
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching Inactivate reviews:', error);
        res.status(500).json({ error: 'An error occurred while fetching reviews' });
    }
};

// Add the route in your routes file
router.get('/inactivatedecision/', getDMICPReadReviewsByInactivateDecision);


module.exports = router;
