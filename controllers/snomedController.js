const db = require('../models'); // Import the models

// Controller function to search for SNOMED terms
const searchSnomedTerm = async (req, res) => {
    const { searchTerm } = req.params;

    console.log(`Searching for SNOMED term: ${searchTerm}`);

    try {
        let intResults, ukResults;

        // Regular expression to match conceptId format (greater than 5 digits, ends with "00" followed by 1-9)
        const conceptIdPattern = /^\d{3,}[0-9]0[0-9]$/;

        if (conceptIdPattern.test(searchTerm)) {
            // If the searchTerm matches the conceptId pattern, search by conceptId
            intResults = await db.SnomedIntDescription.findAll({
                where: {
                    conceptId: searchTerm,
                    active: true
                },
                include: [{
                    model: db.SnomedIntConcept,
                    where: {
                        active: true
                    },
                    attributes: []
                }],
                attributes: ['id', 'term', 'conceptId', 'moduleId']
            });

            ukResults = await db.SnomedUKDescription.findAll({
                where: {
                    conceptId: searchTerm,
                    active: true
                },
                include: [{
                    model: db.SnomedUKConcept,
                    where: {
                        active: true
                    },
                    attributes: []
                }],
                attributes: ['id', 'term', 'conceptId',  'moduleId']
            });

        } else {
            // Otherwise, search by term
            intResults = await db.SnomedIntDescription.findAll({
                where: {
                    term: {
                        [db.Sequelize.Op.like]: `%${searchTerm}%`
                    },
                    active: true
                },
                include: [{
                    model: db.SnomedIntConcept,
                    where: {
                        active: true
                    },
                    attributes: []
                }],
                attributes: ['id', 'term', 'conceptId', 'moduleId']
            });

            ukResults = await db.SnomedUKDescription.findAll({
                where: {
                    term: {
                        [db.Sequelize.Op.like]: `%${searchTerm}%`
                    },
                    active: true
                },
                include: [{
                    model: db.SnomedUKConcept,
                    where: {
                        active: true
                    },
                    attributes: []
                }],
                attributes: ['id', 'term', 'conceptId', 'moduleId']
            });
        }

        // Combine the results from both databases
        console.log(`Found ${intResults.length} results from SNOMED-INT and ${ukResults.length} results from SNOMED-UK`);

        const results = [...ukResults, ...intResults];

        res.json(results); // Return the combined results as JSON
    } catch (error) {
        console.error('Error searching SNOMED term:', error);
        res.status(500).json({ error: 'An error occurred while searching for SNOMED terms.' });
    }
};




const getSnomedDescriptionsByConceptId = async (req, res) => {
    const { conceptId } = req.params;

    try {
        const intDescriptions = await db.SnomedIntDescription.findAll({
            where: { conceptId },
            attributes: ['id', 'term', 'conceptId', 'moduleId']
        });

        const ukDescriptions = await db.SnomedUKDescription.findAll({
            where: { conceptId },
            attributes: ['id', 'term', 'conceptId', 'moduleId']
        });

        const descriptions = [...intDescriptions, ...ukDescriptions];
        res.json(descriptions);
    } catch (error) {
        console.error('Error fetching SNOMED descriptions:', error);
        res.status(500).json({ error: 'An error occurred while fetching descriptions.' });
    }
};

const getParentCodes = async (req, res) => {
    const { conceptId } = req.params;

    try {
        // Fetch relationships from International and UK datasets
        const intRelationships = await db.SnomedIntRelationship.findAll({
            where: { 
                sourceId: conceptId,
                active: true,
                relationshipGroup: false,
                typeId: '116680003'
            }
        });

        const ukRelationships = await db.SnomedUKRelationship.findAll({
            where: { 
                sourceId: conceptId,
                active: true,
                relationshipGroup: false,
                typeId: '116680003'
            }
        });

        const relationships = [...intRelationships, ...ukRelationships];

        // Check if the destinationIds correspond with active ids in the concepts table
        const activeDestinationIds = await Promise.all(relationships.map(async (relationship) => {
            const concept = await db.SnomedIntConcept.findOne({
                where: {
                    id: relationship.destinationId,
                    active: true
                },
                attributes: ['id']
            }) || await db.SnomedUKConcept.findOne({
                where: {
                    id: relationship.destinationId,
                    active: true
                },
                attributes: ['id']
            });

            return concept ? relationship.destinationId : null;
        }));

        const validDestinationIds = activeDestinationIds.filter(id => id !== null);

        // Fetch descriptions for valid destinationIds
        const descriptions = await Promise.all(validDestinationIds.map(async (destinationId) => {
            const description = await db.SnomedIntDescription.findOne({
                where: {
                    conceptId: destinationId,
                    typeId: '900000000000003001'
                },
                attributes: ['term', 'conceptId', 'moduleId']
            }) || await db.SnomedUKDescription.findOne({
                where: {
                    conceptId: destinationId,
                    typeId: '900000000000003001'
                },
                attributes: ['term', 'conceptId', 'moduleId']
            });

            return description;
        }));

        const validDescriptions = descriptions.filter(desc => desc !== null);
        res.json(validDescriptions);
    } catch (error) {
        console.error('Error fetching parent codes:', error);
        res.status(500).json({ error: 'An error occurred while fetching parent codes.' });
    }
};


const getChildCodes = async (req, res) => {
    const { conceptId } = req.params;

    try {
        // Fetch relationships from International and UK datasets
        const intRelationships = await db.SnomedIntRelationship.findAll({
            where: { 
                destinationId: conceptId,
                active: true,
                relationshipGroup: false,
                typeId: '116680003'
            }
        });

        const ukRelationships = await db.SnomedUKRelationship.findAll({
            where: { 
                destinationId: conceptId,
                active: true,
                relationshipGroup: false,
                typeId: '116680003'
            }
        });

        const relationships = [...intRelationships, ...ukRelationships];

        // Check if the sourceIds correspond with active ids in the concepts table
        const activeSourceIds = await Promise.all(relationships.map(async (relationship) => {
            const concept = await db.SnomedIntConcept.findOne({
                where: {
                    id: relationship.sourceId,
                    active: true
                },
                attributes: ['id']
            }) || await db.SnomedUKConcept.findOne({
                where: {
                    id: relationship.sourceId,
                    active: true
                },
                attributes: ['id']
            });

            return concept ? relationship.sourceId : null;
        }));

        const validSourceIds = activeSourceIds.filter(id => id !== null);

        // Fetch descriptions for valid sourceIds
        const descriptions = await Promise.all(validSourceIds.map(async (sourceId) => {
            const description = await db.SnomedIntDescription.findOne({
                where: {
                    conceptId: sourceId,
                    typeId: '900000000000003001'
                },
                attributes: ['term', 'conceptId', 'moduleId']
            }) || await db.SnomedUKDescription.findOne({
                where: {
                    conceptId: sourceId,
                    typeId: '900000000000003001'
                },
                attributes: ['term', 'conceptId', 'moduleId']
            });

            return description;
        }));

        const validDescriptions = descriptions.filter(desc => desc !== null);
        res.json(validDescriptions);
    } catch (error) {
        console.error('Error fetching child codes:', error);
        res.status(500).json({ error: 'An error occurred while fetching child codes.' });
    }
};


module.exports = {
    getChildCodes,
    // other functions...
};



module.exports = {
    searchSnomedTerm,
    getSnomedDescriptionsByConceptId,
    getParentCodes,
    getChildCodes
};
