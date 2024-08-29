module.exports = (sequelize, DataTypes) => {
    const SnomedDMSDescription = sequelize.define("SnomedDMSDescription", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        effectiveTime: DataTypes.DATEONLY,
        active: DataTypes.BOOLEAN,
        moduleId: DataTypes.BIGINT,
        conceptId: DataTypes.BIGINT,
        languageCode: DataTypes.STRING(2),
        typeId: DataTypes.BIGINT,
        term: DataTypes.STRING(255),
        caseSignificanceId: DataTypes.BIGINT
    });

    SnomedDMSDescription.associate = models => {
        console.log('process.env.DISABLE_ASSOCIATIONS', process.env.DISABLE_ASSOCIATIONS);
        if (process.env.DISABLE_ASSOCIATIONS !== 'true') {
            // Associate with DMS concepts
            SnomedDMSDescription.belongsTo(models.SnomedDMSConcept, { foreignKey: 'conceptId' });

            // Associate with UK concepts (UK is aware of INT, but INT is not aware of UK)
            SnomedDMSDescription.belongsTo(models.SnomedUKConcept, { foreignKey: 'conceptId', as: 'UKConcept' });
            SnomedDMSDescription.belongsTo(models.SnomedIntConcept, { foreignKey: 'conceptId', as: 'IntConcept' });

            // Add associations to DMS, UK, and International relationships
            SnomedDMSDescription.hasMany(models.SnomedDMSRelationship, { foreignKey: 'sourceId', as: 'SourceRelationshipsDMS' });
            SnomedDMSDescription.hasMany(models.SnomedUKRelationship, { foreignKey: 'sourceId', as: 'SourceRelationshipsUK' });
            SnomedDMSDescription.hasMany(models.SnomedIntRelationship, { foreignKey: 'sourceId', as: 'SourceRelationshipsInt' });

            SnomedDMSDescription.hasMany(models.SnomedDMSRelationship, { foreignKey: 'destinationId', as: 'DestinationRelationshipsDMS' });
            SnomedDMSDescription.hasMany(models.SnomedUKRelationship, { foreignKey: 'destinationId', as: 'DestinationRelationshipsUK' });
            SnomedDMSDescription.hasMany(models.SnomedIntRelationship, { foreignKey: 'destinationId', as: 'DestinationRelationshipsInt' });
        }
    };

    return SnomedDMSDescription;
};
