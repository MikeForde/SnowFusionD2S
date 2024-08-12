const db = require('../models'); // Import the models

// Controller function to search for SNOMED terms
const searchSnomedTerm = async (req, res) => {
    const { searchTerm } = req.params;

    try {
        let results;

        // Regular expression to match conceptId format (greater than 5 digits, ends with "00" followed by 1-9)
        const conceptIdPattern = /^\d{3,}00[1-9]$/;

        if (conceptIdPattern.test(searchTerm)) {
            // If the searchTerm matches the conceptId pattern, search by conceptId
            results = await db.SnomedIntDescription.findAll({
                where: {
                    conceptId: searchTerm
                },
                include: [{
                    model: db.SnomedIntConcept,
                    where: {
                        active: true
                    },
                    attributes: [] // We don't need to include any additional attributes from the concept table
                }],
                attributes: ['id', 'term', 'conceptId']
            });
        } else {
            // Otherwise, search by term
            results = await db.SnomedIntDescription.findAll({
                where: {
                    term: {
                        [db.Sequelize.Op.like]: `%${searchTerm}%`
                    },
                },
                include: [{
                    model: db.SnomedIntConcept,
                    where: {
                        active: true
                    },
                    attributes: [] // We don't need to include any additional attributes from the concept table
                }],
                attributes: ['id', 'term', 'conceptId']
            });
        }

        res.json(results); // Return the results as JSON
    } catch (error) {
        console.error('Error searching SNOMED term:', error);
        res.status(500).json({ error: 'An error occurred while searching for SNOMED terms.' });
    }
};



const getSnomedDescriptionsByConceptId = async (req, res) => {
    const { conceptId } = req.params;

    try {
        const descriptions = await db.SnomedIntDescription.findAll({
            where: { conceptId },
            attributes: ['id', 'term', 'conceptId']
        });

        res.json(descriptions);
    } catch (error) {
        console.error('Error fetching SNOMED descriptions:', error);
        res.status(500).json({ error: 'An error occurred while fetching descriptions.' });
    }
};

const getParentCodes = async (req, res) => {
    const { conceptId } = req.params;

    try {
        console.log(`Received conceptId: ${conceptId}`);

        // Step 1: Find all entries in the relationship table where sourceId matches the conceptId
        const relationships = await db.SnomedIntRelationship.findAll({
            where: { 
                sourceId: conceptId,
                active: true,
                relationshipGroup: false
            }
        });

        console.log(`Relationships found for conceptId ${conceptId}:`, relationships);

        // Step 2: Check if the destinationIds correspond with active ids in the concepts table
        const activeDestinationIds = await Promise.all(relationships.map(async (relationship) => {
            const concept = await db.SnomedIntConcept.findOne({
                where: {
                    id: relationship.destinationId,
                    active: true
                },
                attributes: ['id']
            });

            if (concept) {
                console.log(`Active concept found for destinationId ${relationship.destinationId}`);
                return relationship.destinationId;
            } else {
                console.log(`No active concept found for destinationId ${relationship.destinationId}`);
                return null;
            }
        }));

        // Filter out null values (i.e., destinationIds that don't correspond to an active concept)
        const validDestinationIds = activeDestinationIds.filter(id => id !== null);

        // Step 3: For each valid destinationId, find the corresponding description where typeId is '900000000000003001'
        const descriptions = await Promise.all(validDestinationIds.map(async (destinationId) => {
            const description = await db.SnomedIntDescription.findOne({
                where: {
                    conceptId: destinationId,
                    typeId: '900000000000003001'
                },
                attributes: ['term', 'conceptId']
            });
            console.log(`Description found for active destinationId ${destinationId}:`, description);
            return description;
        }));

        // Filter out null values (in case no description was found)
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
        // console.log(`Received conceptId: ${conceptId}`);

        // Step 1: Find all entries in the relationship table where destinationId matches the conceptId
        const relationships = await db.SnomedIntRelationship.findAll({
            where: { 
                destinationId: conceptId,
                active: true,
                relationshipGroup: false
            }
        });

        // console.log(`Relationships found for conceptId ${conceptId}:`, relationships);

        // Step 2: Check if the sourceIds correspond with active ids in the concepts table
        const activeSourceIds = await Promise.all(relationships.map(async (relationship) => {
            const concept = await db.SnomedIntConcept.findOne({
                where: {
                    id: relationship.sourceId,
                    active: true
                },
                attributes: ['id']
            });

            if (concept) {
                // console.log(`Active concept found for sourceId ${relationship.sourceId}`);
                return relationship.sourceId;
            } else {
                // console.log(`No active concept found for sourceId ${relationship.sourceId}`);
                return null;
            }
        }));

        // Filter out null values (i.e., sourceIds that don't correspond to an active concept)
        const validSourceIds = activeSourceIds.filter(id => id !== null);

        // Step 3: For each valid sourceId, find the corresponding description where typeId is '900000000000003001'
        const descriptions = await Promise.all(validSourceIds.map(async (sourceId) => {
            const description = await db.SnomedIntDescription.findOne({
                where: {
                    conceptId: sourceId,
                    typeId: '900000000000003001'
                },
                attributes: ['term', 'conceptId']
            });
            // console.log(`Description found for active sourceId ${sourceId}:`, description);
            return description;
        }));

        // Filter out null values (in case no description was found)
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
