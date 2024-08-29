module.exports = (sequelize, DataTypes) => {
    const SnomedUKRelationship = sequelize.define("SnomedUKRelationship", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        effectiveTime: DataTypes.DATEONLY,
        active: DataTypes.BOOLEAN,
        moduleId: DataTypes.BIGINT,
        sourceId: DataTypes.BIGINT,
        destinationId: DataTypes.BIGINT,
        relationshipGroup: DataTypes.INTEGER,
        typeId: DataTypes.BIGINT,
        characteristicTypeId: DataTypes.BIGINT,
        modifierId: DataTypes.BIGINT
    });

    SnomedUKRelationship.associate = models => {
        if (process.env.DISABLE_ASSOCIATIONS !== 'true') {
            // Associate sourceId with either UK or International concepts
            SnomedUKRelationship.belongsTo(models.SnomedUKConcept, { as: 'sourceConceptUK', foreignKey: 'sourceId' });
            SnomedUKRelationship.belongsTo(models.SnomedIntConcept, { as: 'sourceConceptInt', foreignKey: 'sourceId' });

            // Associate destinationId with either UK or International concepts
            SnomedUKRelationship.belongsTo(models.SnomedUKConcept, { as: 'destinationConceptUK', foreignKey: 'destinationId' });
            SnomedUKRelationship.belongsTo(models.SnomedIntConcept, { as: 'destinationConceptInt', foreignKey: 'destinationId' });

            // Add associations to the UK and International description models
            SnomedUKRelationship.belongsTo(models.SnomedUKDescription, { foreignKey: 'sourceId', targetKey: 'conceptId', as: 'SourceDescriptionUK' });
            SnomedUKRelationship.belongsTo(models.SnomedIntDescription, { foreignKey: 'sourceId', targetKey: 'conceptId', as: 'SourceDescriptionInt' });

            SnomedUKRelationship.belongsTo(models.SnomedUKDescription, { foreignKey: 'destinationId', targetKey: 'conceptId', as: 'DestinationDescriptionUK' });
            SnomedUKRelationship.belongsTo(models.SnomedIntDescription, { foreignKey: 'destinationId', targetKey: 'conceptId', as: 'DestinationDescriptionInt' });
        }
    };

    return SnomedUKRelationship;
};
