const db = require('../models'); // Import the models

// Controller function to search for SNOMED terms
const searchSnomedTerm = async (req, res) => {
    const { searchTerm } = req.params;

    try {
        // Search the SnomedIntDescription table for matching terms
        const results = await db.SnomedIntDescription.findAll({
            where: {
                term: {
                    [db.Sequelize.Op.like]: `%${searchTerm}%`
                }
            },
            attributes: ['id', 'term', 'conceptId']
        });

        res.json(results); // Return the results as JSON
    } catch (error) {
        console.error('Error searching SNOMED term:', error);
        res.status(500).json({ error: 'An error occurred while searching for SNOMED terms.' });
    }
};

module.exports = {
    searchSnomedTerm
};
