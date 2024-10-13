const db = require('../models'); // Import the models

// Controller function to search for SNOMED terms
const searchSnomedTerm = async (req, res) => {
    const { searchTerm } = req.params;

    console.log(`Searching for SNOMED term: ${searchTerm}`);

    try {
        // Regular expression to match conceptId format
        const conceptIdPattern = /^\d{3,}\d0[0-9]$/;

        let results = [];

        if (conceptIdPattern.test(searchTerm)) {
            // The searchTerm appears to be a conceptId (code)
            const conceptId = searchTerm;

            // 1. Check in DMS dataset
            const dmsConcept = await db.SnomedDMSConcept.findOne({ where: { id: conceptId, active: true } });
            if (dmsConcept) {
                const dmsDescriptions = await db.SnomedDMSDescription.findAll({
                    where: { conceptId, active: true, typeId: '900000000000003001' },
                    attributes: ['id', 'term', 'conceptId', 'moduleId'],
                });
                res.json(dmsDescriptions);
                return;
            }

            // 2. Check in UK dataset
            const ukConcept = await db.SnomedUKConcept.findOne({ where: { id: conceptId, active: true } });
            if (ukConcept) {
                let ukDescriptions = await db.SnomedUKDescription.findAll({
                    where: { conceptId, active: true, typeId: '900000000000003001' },
                    attributes: ['id', 'term', 'conceptId', 'moduleId'],
                });
                if (ukDescriptions.length > 0) {
                    res.json(ukDescriptions);
                    return;
                } else {
                    // Exception: No description in UK, look in International descriptions
                    const intDescriptions = await db.SnomedIntDescription.findAll({
                        where: { conceptId, active: true, typeId: '900000000000003001' },
                        attributes: ['id', 'term', 'conceptId'], // Exclude original moduleId
                    });

                    // Set moduleId to UK moduleId (999000041000000102)
                    intDescriptions.forEach(desc => {
                        desc.moduleId = '999000041000000102';
                    });

                    res.json(intDescriptions);
                    return;
                }
            }

            // 3. Check in International dataset
            const intConcept = await db.SnomedIntConcept.findOne({ where: { id: conceptId, active: true } });
            if (intConcept) {
                const intDescriptions = await db.SnomedIntDescription.findAll({
                    where: { conceptId, active: true, typeId: '900000000000003001' },
                    attributes: ['id', 'term', 'conceptId', 'moduleId'],
                });
                res.json(intDescriptions);
                return;
            }

            // No active concept found
            res.json([]);
            return;
        } else {
            // The searchTerm is a term (not a code)

            // Helper function to search a dataset
            const searchDataset = async (descriptionModel, conceptModel, term) => {
                const descriptions = await descriptionModel.findAll({
                    where: { term: { [db.Sequelize.Op.like]: `%${term}%` }, active: true, typeId: '900000000000003001' },
                    attributes: ['id', 'term', 'conceptId', 'moduleId'],
                });
                if (descriptions.length === 0) return [];

                const conceptIds = [...new Set(descriptions.map((desc) => desc.conceptId))];
                const concepts = await conceptModel.findAll({
                    where: { id: conceptIds, active: true },
                    attributes: ['id'],
                });
                const activeConceptIds = new Set(concepts.map((concept) => concept.id));
                return descriptions.filter((desc) => activeConceptIds.has(desc.conceptId));
            };

            // Initialize an array to collect all results
            let allResults = [];

            // 1. Search in DMS dataset
            const dmsResults = await searchDataset(db.SnomedDMSDescription, db.SnomedDMSConcept, searchTerm);
            allResults.push(...dmsResults);

            // 2. Search in UK dataset
            const ukResults = await searchDataset(db.SnomedUKDescription, db.SnomedUKConcept, searchTerm);
            allResults.push(...ukResults);

            // 3. Search in International dataset
            const intResults = await searchDataset(db.SnomedIntDescription, db.SnomedIntConcept, searchTerm);

            // Handle exceptions for International dataset
            let finalIntResults = [];

            if (intResults.length > 0) {
                // Check if concepts are active in International dataset
                const intConceptIds = [...new Set(intResults.map((desc) => desc.conceptId))];
                const intConcepts = await db.SnomedIntConcept.findAll({
                    where: { id: intConceptIds, active: true },
                    attributes: ['id'],
                });
                const activeIntConceptIds = new Set(intConcepts.map((concept) => concept.id));

                // Split results into active and inactive concepts in International dataset
                const activeIntDescriptions = intResults.filter((desc) => activeIntConceptIds.has(desc.conceptId));
                const inactiveIntDescriptions = intResults.filter((desc) => !activeIntConceptIds.has(desc.conceptId));

                finalIntResults.push(...activeIntDescriptions);

                // For inactive concepts, check if they are active in UK dataset
                if (inactiveIntDescriptions.length > 0) {
                    const inactiveConceptIds = [...new Set(inactiveIntDescriptions.map((desc) => desc.conceptId))];
                    const ukConcepts = await db.SnomedUKConcept.findAll({
                        where: { id: inactiveConceptIds, active: true },
                        attributes: ['id'],
                    });
                    const activeUkConceptIds = new Set(ukConcepts.map((concept) => concept.id));
                    const exceptionDescriptions = inactiveIntDescriptions.filter((desc) => activeUkConceptIds.has(desc.conceptId));

                    // Set moduleId to UK moduleId (999000041000000102)
                    exceptionDescriptions.forEach(desc => {
                        desc.moduleId = '999000041000000102';
                    });

                    finalIntResults.push(...exceptionDescriptions);
                }
            }

            allResults.push(...finalIntResults);

            // Remove duplicates based on description ID
            const uniqueResults = [];
            const seenIds = new Set();

            for (let desc of allResults) {
                if (!seenIds.has(desc.id)) {
                    seenIds.add(desc.id);
                    uniqueResults.push(desc);
                }
            }

            console.log(`Found ${uniqueResults.length} active descriptions for the search term.`);

            res.json(uniqueResults);
            return;
        }
    } catch (error) {
        console.error('Error searching SNOMED term:', error);
        res.status(500).json({ error: 'An error occurred while searching for SNOMED terms.' });
    }
};


const searchSnomedCode = async (req, res) => {
    const { searchCode } = req.params;

    console.log(`Searching for SNOMED code: ${searchCode}`);

    try {
        let results = [];
        const conceptId = searchCode;

        // 1. Check in DMS dataset
        const dmsConcept = await db.SnomedDMSConcept.findOne({ where: { id: conceptId, active: true } });
        if (dmsConcept) {
            const dmsDescriptions = await db.SnomedDMSDescription.findAll({
                where: { conceptId, active: true, typeId: '900000000000003001' },
                attributes: ['id', 'term', 'conceptId', 'moduleId'],
            });
            results.push(...dmsDescriptions);
            res.json(results);
            return;
        }

        // 2. Check in UK dataset
        const ukConcept = await db.SnomedUKConcept.findOne({ where: { id: conceptId, active: true } });
        if (ukConcept) {
            let ukDescriptions = await db.SnomedUKDescription.findAll({
                where: { conceptId, active: true, typeId: '900000000000003001' },
                attributes: ['id', 'term', 'conceptId', 'moduleId'],
            });
            if (ukDescriptions.length > 0) {
                results.push(...ukDescriptions);
            } else {
                // Exception: No description in UK, look in International descriptions
                const intDescriptions = await db.SnomedIntDescription.findAll({
                    where: { conceptId, active: true, typeId: '900000000000003001' },
                    attributes: ['id', 'term', 'conceptId'], // Exclude original moduleId
                });

                // Set moduleId to UK moduleId (999000041000000102)
                intDescriptions.forEach(desc => {
                    desc.moduleId = '999000041000000102';
                });

                results.push(...intDescriptions);
            }
            res.json(results);
            return;
        }

        // 3. Check in International dataset
        const intConcept = await db.SnomedIntConcept.findOne({ where: { id: conceptId, active: true } });
        if (intConcept) {
            const intDescriptions = await db.SnomedIntDescription.findAll({
                where: { conceptId, active: true, typeId: '900000000000003001' },
                attributes: ['id', 'term', 'conceptId', 'moduleId'],
            });
            results.push(...intDescriptions);
            res.json(results);
            return;
        }

        // Exception: If description exists in International but concept inactive, check if concept is active in UK
        const intDescriptions = await db.SnomedIntDescription.findAll({
            where: { conceptId, active: true, typeId: '900000000000003001' },
            attributes: ['id', 'term', 'conceptId'], // Exclude original moduleId
        });
        if (intDescriptions.length > 0) {
            const ukConceptInactive = await db.SnomedUKConcept.findOne({ where: { id: conceptId, active: true } });
            if (ukConceptInactive) {
                // Set moduleId to UK moduleId (999000041000000102)
                intDescriptions.forEach(desc => {
                    desc.moduleId = '999000041000000102';
                });
                results.push(...intDescriptions);
                res.json(results);
                return;
            }
        }

        // No active concept found
        res.json([]);
        return;

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
        // Fetch relationships from all datasets
        const relationships = await Promise.all([
            db.SnomedIntRelationship.findAll({
                where: {
                    sourceId: conceptId,
                    active: true,
                    relationshipGroup: 0,
                    typeId: '116680003'
                }
            }),
            db.SnomedUKRelationship.findAll({
                where: {
                    sourceId: conceptId,
                    active: true,
                    relationshipGroup: 0,
                    typeId: '116680003'
                }
            }),
            db.SnomedDMSRelationship.findAll({
                where: {
                    sourceId: conceptId,
                    active: true,
                    relationshipGroup: 0,
                    typeId: '116680003'
                }
            })
        ]);

        const allRelationships = relationships.flat();

        // Collect destinationIds
        const destinationIds = new Set(allRelationships.map(rel => rel.destinationId));

        let parentConcepts = [];

        for (let destId of destinationIds) {
            // Check if the destination concept is active in any dataset
            const intConcept = await db.SnomedIntConcept.findOne({ where: { id: destId, active: true } });
            const ukConcept = await db.SnomedUKConcept.findOne({ where: { id: destId, active: true } });
            const dmsConcept = await db.SnomedDMSConcept.findOne({ where: { id: destId, active: true } });

            if (intConcept || ukConcept || dmsConcept) {
                let descriptions = [];

                if (dmsConcept) {
                    // Fetch descriptions from DMS dataset
                    const dmsDescriptions = await db.SnomedDMSDescription.findAll({
                        where: {
                            conceptId: destId,
                            active: true,
                            typeId: '900000000000003001'
                        },
                        attributes: ['id', 'term', 'conceptId', 'moduleId']
                    });
                    descriptions.push(...dmsDescriptions);
                }

                if (ukConcept) {
                    // Fetch descriptions from UK dataset
                    const ukDescriptions = await db.SnomedUKDescription.findAll({
                        where: {
                            conceptId: destId,
                            active: true,
                            typeId: '900000000000003001'
                        },
                        attributes: ['id', 'term', 'conceptId', 'moduleId']
                    });

                    if (ukDescriptions.length > 0) {
                        descriptions.push(...ukDescriptions);
                    } else {
                        // Exception: No description in UK, look in International descriptions
                        const intDescriptions = await db.SnomedIntDescription.findAll({
                            where: {
                                conceptId: destId,
                                active: true,
                                typeId: '900000000000003001'
                            },
                            attributes: ['id', 'term', 'conceptId'] // Exclude original moduleId
                        });

                        // Set moduleId to UK moduleId (999000041000000102)
                        intDescriptions.forEach(desc => {
                            desc.moduleId = '999000041000000102';
                        });

                        descriptions.push(...intDescriptions);
                    }
                }

                if (intConcept && !ukConcept && !dmsConcept) {
                    // Fetch descriptions from International dataset
                    const intDescriptions = await db.SnomedIntDescription.findAll({
                        where: {
                            conceptId: destId,
                            active: true,
                            typeId: '900000000000003001'
                        },
                        attributes: ['id', 'term', 'conceptId', 'moduleId']
                    });
                    descriptions.push(...intDescriptions);
                }

                parentConcepts.push(...descriptions);
            }
        }


        // Remove duplicates
        const uniqueParents = [];
        const seenIds = new Set();

        for (let parent of parentConcepts) {
            if (!seenIds.has(parent.id)) {
                seenIds.add(parent.id);
                uniqueParents.push(parent);
            }
        }

        res.json(uniqueParents);
    } catch (error) {
        console.error('Error fetching parent codes:', error);
        res.status(500).json({ error: 'An error occurred while fetching parent codes.' });
    }
};


const getChildCodes = async (req, res) => {
    const { conceptId } = req.params;

    try {
        // Fetch relationships from all datasets
        const relationships = await Promise.all([
            db.SnomedIntRelationship.findAll({
                where: {
                    destinationId: conceptId,
                    active: true,
                    relationshipGroup: 0,
                    typeId: '116680003'
                }
            }),
            db.SnomedUKRelationship.findAll({
                where: {
                    destinationId: conceptId,
                    active: true,
                    relationshipGroup: 0,
                    typeId: '116680003'
                }
            }),
            db.SnomedDMSRelationship.findAll({
                where: {
                    destinationId: conceptId,
                    active: true,
                    relationshipGroup: 0,
                    typeId: '116680003'
                }
            })
        ]);

        const allRelationships = relationships.flat();

        // Collect sourceIds
        const sourceIds = new Set(allRelationships.map(rel => rel.sourceId));

        let childConcepts = [];

        for (let srcId of sourceIds) {
            // Check if the source concept is active in any dataset
            const intConcept = await db.SnomedIntConcept.findOne({ where: { id: srcId, active: true } });
            const ukConcept = await db.SnomedUKConcept.findOne({ where: { id: srcId, active: true } });
            const dmsConcept = await db.SnomedDMSConcept.findOne({ where: { id: srcId, active: true } });

            if (intConcept || ukConcept || dmsConcept) {
                let descriptions = [];

                if (dmsConcept) {
                    // Fetch descriptions from DMS dataset
                    const dmsDescriptions = await db.SnomedDMSDescription.findAll({
                        where: {
                            conceptId: srcId,
                            active: true,
                            typeId: '900000000000003001'
                        },
                        attributes: ['id', 'term', 'conceptId', 'moduleId']
                    });
                    descriptions.push(...dmsDescriptions);
                }

                if (ukConcept) {
                    // Fetch descriptions from UK dataset
                    const ukDescriptions = await db.SnomedUKDescription.findAll({
                        where: {
                            conceptId: srcId,
                            active: true,
                            typeId: '900000000000003001'
                        },
                        attributes: ['id', 'term', 'conceptId', 'moduleId']
                    });

                    if (ukDescriptions.length > 0) {
                        descriptions.push(...ukDescriptions);
                    } else {
                        // Exception: No description in UK, look in International descriptions
                        const intDescriptions = await db.SnomedIntDescription.findAll({
                            where: {
                                conceptId: srcId,
                                active: true,
                                typeId: '900000000000003001'
                            },
                            attributes: ['id', 'term', 'conceptId'] // Exclude original moduleId
                        });

                        // Set moduleId to UK moduleId (999000041000000102)
                        intDescriptions.forEach(desc => {
                            desc.moduleId = '999000041000000102';
                        });

                        descriptions.push(...intDescriptions);
                    }
                }

                if (intConcept && !ukConcept && !dmsConcept) {
                    // Fetch descriptions from International dataset
                    const intDescriptions = await db.SnomedIntDescription.findAll({
                        where: {
                            conceptId: srcId,
                            active: true,
                            typeId: '900000000000003001'
                        },
                        attributes: ['id', 'term', 'conceptId', 'moduleId']
                    });
                    descriptions.push(...intDescriptions);
                }

                childConcepts.push(...descriptions);
            }
        }

        // Remove duplicates
        const uniqueChildren = [];
        const seenIds = new Set();

        for (let child of childConcepts) {
            if (!seenIds.has(child.id)) {
                seenIds.add(child.id);
                uniqueChildren.push(child);
            }
        }

        res.json(uniqueChildren);
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
