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
        SnomedDMSRelationship.belongsTo(models.SnomedDMSConcept, { as: 'sourceConcept', foreignKey: 'sourceId' });
        SnomedDMSRelationship.belongsTo(models.SnomedDMSConcept, { as: 'destinationConcept', foreignKey: 'destinationId' });
    };

    return SnomedDMSRelationship;
};
