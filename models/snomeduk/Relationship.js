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
        SnomedUKRelationship.belongsTo(models.SnomedUKConcept, { as: 'sourceConcept', foreignKey: 'sourceId' });
        SnomedUKRelationship.belongsTo(models.SnomedUKConcept, { as: 'destinationConcept', foreignKey: 'destinationId' });
    };

    return SnomedUKRelationship;
};
