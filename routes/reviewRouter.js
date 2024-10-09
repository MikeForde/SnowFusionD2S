const db = require('../models'); // Import the models

const express = require('express');

const router = express.Router();

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
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while searching.' });
        console.error("Error:", error);
    }
});


module.exports = router;
