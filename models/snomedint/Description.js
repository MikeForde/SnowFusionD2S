module.exports = (sequelize, DataTypes) => {
    const SnomedIntDescription = sequelize.define("SnomedIntDescription", {
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

    SnomedIntDescription.associate = models => {
        SnomedIntDescription.belongsTo(models.SnomedIntConcept, { foreignKey: 'conceptId' });

        // Add associations to the SnomedIntRelationship model
        SnomedIntDescription.hasMany(models.SnomedIntRelationship, { foreignKey: 'sourceId', as: 'SourceRelationships' });
        SnomedIntDescription.hasMany(models.SnomedIntRelationship, { foreignKey: 'destinationId', as: 'DestinationRelationships' });
    };

    return SnomedIntDescription;
};
