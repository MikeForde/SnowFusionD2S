module.exports = (sequelize, DataTypes) => {
    const SnomedDMSRelationship = sequelize.define("SnomedDMSRelationship", {
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

    SnomedDMSRelationship.associate = models => {
        if (process.env.DISABLE_ASSOCIATIONS !== 'true') {
            // Associate sourceId with DMS, UK, or International concepts
            SnomedDMSRelationship.belongsTo(models.SnomedDMSConcept, { as: 'sourceConceptDMS', foreignKey: 'sourceId' });
            SnomedDMSRelationship.belongsTo(models.SnomedUKConcept, { as: 'sourceConceptUK', foreignKey: 'sourceId' });
            SnomedDMSRelationship.belongsTo(models.SnomedIntConcept, { as: 'sourceConceptInt', foreignKey: 'sourceId' });

            // Associate destinationId with DMS, UK, or International concepts
            SnomedDMSRelationship.belongsTo(models.SnomedDMSConcept, { as: 'destinationConceptDMS', foreignKey: 'destinationId' });
            SnomedDMSRelationship.belongsTo(models.SnomedUKConcept, { as: 'destinationConceptUK', foreignKey: 'destinationId' });
            SnomedDMSRelationship.belongsTo(models.SnomedIntConcept, { as: 'destinationConceptInt', foreignKey: 'destinationId' });

            // Add associations to the DMS, UK, and International description models
            SnomedDMSRelationship.belongsTo(models.SnomedDMSDescription, { foreignKey: 'sourceId', targetKey: 'conceptId', as: 'SourceDescriptionDMS' });
            SnomedDMSRelationship.belongsTo(models.SnomedUKDescription, { foreignKey: 'sourceId', targetKey: 'conceptId', as: 'SourceDescriptionUK' });
            SnomedDMSRelationship.belongsTo(models.SnomedIntDescription, { foreignKey: 'sourceId', targetKey: 'conceptId', as: 'SourceDescriptionInt' });

            SnomedDMSRelationship.belongsTo(models.SnomedDMSDescription, { foreignKey: 'destinationId', targetKey: 'conceptId', as: 'DestinationDescriptionDMS' });
            SnomedDMSRelationship.belongsTo(models.SnomedUKDescription, { foreignKey: 'destinationId', targetKey: 'conceptId', as: 'DestinationDescriptionUK' });
            SnomedDMSRelationship.belongsTo(models.SnomedIntDescription, { foreignKey: 'destinationId', targetKey: 'conceptId', as: 'DestinationDescriptionInt' });
        }
    };

    return SnomedDMSRelationship;
};
