module.exports = (sequelize, DataTypes) => {
    const SnomedIntRelationship = sequelize.define("SnomedIntRelationship", {
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

    SnomedIntRelationship.associate = models => {
        SnomedIntRelationship.belongsTo(models.SnomedIntConcept, { as: 'sourceConcept', foreignKey: 'sourceId' });
        SnomedIntRelationship.belongsTo(models.SnomedIntConcept, { as: 'destinationConcept', foreignKey: 'destinationId' });
    };

    return SnomedIntRelationship;
};
