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
        SnomedUKDescription.belongsTo(models.SnomedUKConcept, { foreignKey: 'conceptId' });
    };

    return SnomedUKDescription;
};
