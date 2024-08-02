module.exports = (sequelize, DataTypes) => {
    const SnomedIntConcept = sequelize.define("SnomedIntConcept", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        effectiveTime: DataTypes.DATEONLY,
        active: DataTypes.BOOLEAN,
        moduleId: DataTypes.BIGINT,
        definitionStatusId: DataTypes.BIGINT
    });

    return SnomedIntConcept;
};
