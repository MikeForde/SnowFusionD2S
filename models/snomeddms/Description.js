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
            SnomedDMSDescription.belongsTo(models.SnomedDMSConcept, { foreignKey: 'conceptId' });
        }
    };

    return SnomedDMSDescription;
};
