module.exports = (sequelize, DataTypes) => {
    const SnomedUKDescription = sequelize.define("SnomedUKDescription", {
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

    SnomedUKDescription.associate = models => {
        // Associate with UK concepts (existing)
        SnomedUKDescription.belongsTo(models.SnomedUKConcept, { foreignKey: 'conceptId' });

        // Add associations to both UK and International relationships
        SnomedUKDescription.hasMany(models.SnomedUKRelationship, { foreignKey: 'sourceId', as: 'SourceRelationshipsUK' });
        SnomedUKDescription.hasMany(models.SnomedIntRelationship, { foreignKey: 'sourceId', as: 'SourceRelationshipsInt' });

        SnomedUKDescription.hasMany(models.SnomedUKRelationship, { foreignKey: 'destinationId', as: 'DestinationRelationshipsUK' });
        SnomedUKDescription.hasMany(models.SnomedIntRelationship, { foreignKey: 'destinationId', as: 'DestinationRelationshipsInt' });
    };

    return SnomedUKDescription;
};
