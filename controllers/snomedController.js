const db = require('../models'); // Import the models

// Controller function to search for SNOMED terms
const searchSnomedTerm = async (req, res) => {
    const { searchTerm } = req.params;

    console.log(`Searching for SNOMED term: ${searchTerm}`);

    try {
        let intResults, ukResults, dmsResults;

        // Regular expression to match conceptId format (greater than 5 digits, ends with "00" followed by 1-9)
        const conceptIdPattern = /^\d{3,}[0-9]0[0-9]$/;

        if (conceptIdPattern.test(searchTerm)) {
            // If the searchTerm matches the conceptId pattern, search by conceptId
            intResults = await db.SnomedIntDescription.findAll({
                where: {
                    conceptId: searchTerm,
                    active: true,
                    typeId: '900000000000003001'
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
                    active: true,
                    typeId: '900000000000003001'
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

            dmsResults = await db.SnomedDMSDescription.findAll({
                where: {
                    conceptId: searchTerm,
                    active: true,
                    typeId: '900000000000003001'
                },
                include: [{
                    model: db.SnomedDMSConcept,
                    where: {
                        active: true
                    },
                    attributes: []
                }],
                attributes: ['id', 'term', 'conceptId', 'moduleId']
            });

        } else {
            // Otherwise, search by term
            intResults = await db.SnomedIntDescription.findAll({
                where: {
                    term: {
                        [db.Sequelize.Op.like]: `%${searchTerm}%`
                    },
                    active: true,
                    typeId: '900000000000003001'
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
                    active: true,
                    typeId: '900000000000003001'
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

            dmsResults = await db.SnomedDMSDescription.findAll({
                where: {
                    term: {
                        [db.Sequelize.Op.like]: `%${searchTerm}%`
                    },
                    active: true,
                    typeId: '900000000000003001'
                },
                include: [{
                    model: db.SnomedDMSConcept,
                    where: {
                        active: true
                    },
                    attributes: []
                }],
                attributes: ['id', 'term', 'conceptId', 'moduleId']
            });
        }

        // Combine the results from all three databases
        console.log(`Found ${intResults.length} results from SNOMED-INT, ${ukResults.length} results from SNOMED-UK, and ${dmsResults.length} results from SNOMED-DMS`);

        const results = [...dmsResults, ...ukResults, ...intResults];

        res.json(results); // Return the combined results as JSON
    } catch (error) {
        console.error('Error searching SNOMED term:', error);
        res.status(500).json({ error: 'An error occurred while searching for SNOMED terms.' });
    }
};

const searchSnomedCode = async (req, res) => {
    const { searchCode } = req.params;

    console.log(`Searching for SNOMED code: ${searchCode}`);

    try {
        let intResults, ukResults, dmsResults;


        // Search by conceptId
        intResults = await db.SnomedIntDescription.findAll({
            where: {
                conceptId: searchCode,
                active: true,
                typeId: '900000000000003001'
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
                conceptId: searchCode,
                active: true,
                typeId: '900000000000003001'
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

        dmsResults = await db.SnomedDMSDescription.findAll({
            where: {
                conceptId: searchCode,
                active: true,
                typeId: '900000000000003001'
            },
            include: [{
                model: db.SnomedDMSConcept,
                where: {
                    active: true
                },
                attributes: []
            }],
            attributes: ['id', 'term', 'conceptId', 'moduleId']
        });

        // Combine the results from all three databases
        console.log(`Found ${intResults.length} results from SNOMED-INT, ${ukResults.length} results from SNOMED-UK, and ${dmsResults.length} results from SNOMED-DMS`);

        const results = [...dmsResults, ...ukResults, ...intResults];

        res.json(results); // Return the combined results as JSON
    } catch (error) {
        console.error('Error searching SNOMED code:', error);
        res.status(500).json({ error: 'An error occurred while searching for SNOMED codes.' });
    }
};

const getSnomedDescriptionsByConceptId = async (req, res) => {
    const { conceptId } = req.params;

    try {
        // Fetch descriptions from the International dataset
        const intDescriptions = await db.SnomedIntDescription.findAll({
            where: { conceptId },
            attributes: ['id', 'term', 'conceptId', 'moduleId']
        });

        // Fetch descriptions from the UK dataset
        const ukDescriptions = await db.SnomedUKDescription.findAll({
            where: { conceptId },
            attributes: ['id', 'term', 'conceptId', 'moduleId']
        });

        // Fetch descriptions from the DMS dataset
        const dmsDescriptions = await db.SnomedDMSDescription.findAll({
            where: { conceptId },
            attributes: ['id', 'term', 'conceptId', 'moduleId']
        });

        // Combine the descriptions from all three datasets
        const descriptions = [...intDescriptions, ...ukDescriptions, ...dmsDescriptions];

        // Return the combined descriptions as JSON
        res.json(descriptions);
    } catch (error) {
        console.error('Error fetching SNOMED descriptions:', error);
        res.status(500).json({ error: 'An error occurred while fetching descriptions.' });
    }
};


const getParentCodes = async (req, res) => {
    const { conceptId } = req.params;

    try {
        // Fetch relationships from International, UK, and DMS datasets
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

        const dmsRelationships = await db.SnomedDMSRelationship.findAll({
            where: {
                sourceId: conceptId,
                active: true,
                relationshipGroup: false,
                typeId: '116680003'
            }
        });

        const relationships = [...intRelationships, ...ukRelationships, ...dmsRelationships];

        // Check if the destinationIds correspond with active ids in the concepts table (across all datasets)
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
            }) || await db.SnomedDMSConcept.findOne({
                where: {
                    id: relationship.destinationId,
                    active: true
                },
                attributes: ['id']
            });

            return concept ? relationship.destinationId : null;
        }));

        const validDestinationIds = activeDestinationIds.filter(id => id !== null);

        // Fetch descriptions for valid destinationIds (across all datasets)
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
            }) || await db.SnomedDMSDescription.findOne({
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
        // Fetch relationships from International, UK, and DMS datasets
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

        const dmsRelationships = await db.SnomedDMSRelationship.findAll({
            where: {
                destinationId: conceptId,
                active: true,
                relationshipGroup: false,
                typeId: '116680003'
            }
        });

        const relationships = [...intRelationships, ...ukRelationships, ...dmsRelationships];

        // Check if the sourceIds correspond with active ids in the concepts table (across all datasets)
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
            }) || await db.SnomedDMSConcept.findOne({
                where: {
                    id: relationship.sourceId,
                    active: true
                },
                attributes: ['id']
            });

            return concept ? relationship.sourceId : null;
        }));

        const validSourceIds = activeSourceIds.filter(id => id !== null);

        // Fetch descriptions for valid sourceIds (across all datasets)
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
            }) || await db.SnomedDMSDescription.findOne({
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

const searchSnomedTermType = async (req, res) => {
    const { searchTerm } = req.params;

    console.log(`Searching for SNOMED term with typeId 900000000000003001: ${searchTerm}`);

    try {
        let intResults, ukResults;

        // Regular expression to match conceptId format (greater than 5 digits, ends with "00" followed by 1-9)
        const conceptIdPattern = /^\d{3,}[0-9]0[0-9]$/;

        if (conceptIdPattern.test(searchTerm)) {
            // If the searchTerm matches the conceptId pattern, search by conceptId
            intResults = await db.SnomedIntDescription.findAll({
                where: {
                    conceptId: searchTerm,
                    active: true,
                    typeId: '900000000000003001'
                },
                include: [{
                    model: db.SnomedIntConcept,
                    where: {
                        active: true
                    },
                    attributes: [] // No need for additional attributes from the concept table
                }],
                attributes: ['term'] // Return only the term
            });

            ukResults = await db.SnomedUKDescription.findAll({
                where: {
                    conceptId: searchTerm,
                    active: true,
                    typeId: '900000000000003001'
                },
                include: [{
                    model: db.SnomedUKConcept,
                    where: {
                        active: true
                    },
                    attributes: [] // No need for additional attributes from the concept table
                }],
                attributes: ['term'] // Return only the term
            });

        } else {
            // Otherwise, search by term
            intResults = await db.SnomedIntDescription.findAll({
                where: {
                    term: {
                        [db.Sequelize.Op.like]: `%${searchTerm}%`
                    },
                    active: true,
                    typeId: '900000000000003001'
                },
                include: [{
                    model: db.SnomedIntConcept,
                    where: {
                        active: true
                    },
                    attributes: [] // No need for additional attributes from the concept table
                }],
                attributes: ['term'] // Return only the term
            });

            ukResults = await db.SnomedUKDescription.findAll({
                where: {
                    term: {
                        [db.Sequelize.Op.like]: `%${searchTerm}%`
                    },
                    active: true,
                    typeId: '900000000000003001'
                },
                include: [{
                    model: db.SnomedUKConcept,
                    where: {
                        active: true
                    },
                    attributes: [] // No need for additional attributes from the concept table
                }],
                attributes: ['term'] // Return only the term
            });
        }

        // Combine the results from both datasets
        console.log(`Found ${intResults.length} results from SNOMED-INT and ${ukResults.length} results from SNOMED-UK`);

        const results = [...ukResults, ...intResults];

        res.json(results); // Return the combined results as JSON
    } catch (error) {
        console.error('Error searching SNOMED term:', error);
        res.status(500).json({ error: 'An error occurred while searching for SNOMED terms.' });
    }
};


module.exports = {
    searchSnomedTerm,
    getSnomedDescriptionsByConceptId,
    getParentCodes,
    getChildCodes,
    searchSnomedTermType,
    searchSnomedCode
};
