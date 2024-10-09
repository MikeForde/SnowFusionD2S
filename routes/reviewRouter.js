const db = require('../models'); // Import the models
const express = require('express');
const router = express.Router();

// Function to get the SNOMED Parent term
const getSNOMEDParentTerm = async (snomedParent) => {
    // Try fetching from SnomedIntDescription, SnomedUKDescription, and SnomedDMSDescription
    let parentTerm = await db.SnomedIntDescription.findOne({
        where: { conceptId: snomedParent, typeId: '900000000000003001' },
        attributes: ['term'],
    });

    if (!parentTerm) {
        parentTerm = await db.SnomedUKDescription.findOne({
            where: { conceptId: snomedParent, typeId: '900000000000003001' },
            attributes: ['term'],
        });
    }

    if (!parentTerm) {
        parentTerm = await db.SnomedDMSDescription.findOne({
            where: { conceptId: snomedParent, typeId: '900000000000003001' },
            attributes: ['term'],
        });
    }

    return parentTerm ? parentTerm.term : null; // Return the term or null if not found
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

module.exports = router;
