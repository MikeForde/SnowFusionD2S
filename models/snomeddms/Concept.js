module.exports = (sequelize, DataTypes) => {
    const SnomedDMSConcept = sequelize.define("SnomedDMSConcept", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true
        },
        effectiveTime: DataTypes.DATEONLY,
        active: DataTypes.BOOLEAN,
        moduleId: DataTypes.BIGINT,
        definitionStatusId: DataTypes.BIGINT
    });

    return SnomedDMSConcept;
};