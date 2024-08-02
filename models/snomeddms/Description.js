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
        SnomedDMSDescription.belongsTo(models.SnomedDMSConcept, { foreignKey: 'conceptId' });
    };

    return SnomedDMSDescription;
};
