module.exports = (sequelize, DataTypes) => {
    const SnomedUKConcept = sequelize.define("SnomedUKConcept", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        effectiveTime: DataTypes.DATEONLY,
        active: DataTypes.BOOLEAN,
        moduleId: DataTypes.BIGINT,
        definitionStatusId: DataTypes.BIGINT
    });

    return SnomedUKConcept;
};
