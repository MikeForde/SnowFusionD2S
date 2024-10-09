module.exports = (sequelize, DataTypes) => {
    const DMICPReadReview = sequelize.define("DMICPReadReview", {
        OrigId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Drop: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Purpose: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        DMICPCode: {
            type: DataTypes.STRING(255),  // Changed from TEXT to STRING
            allowNull: true
        },
        Description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Decision: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        FSNType: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        NewDescription: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ManualMapCode: {
            type: DataTypes.STRING(255),  // Changed from TEXT to STRING
            allowNull: true
        },
        ManualMapFSN: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        HasAPIMap: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        APIExactMatch: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        APIMapCode: {
            type: DataTypes.STRING(255),  // Changed from TEXT to STRING
            allowNull: true
        },
        APIMapTerm: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        SNOMEDCode: {
            type: DataTypes.STRING(255),  // Changed from TEXT to STRING
            allowNull: true
        },
        SNOMEDParent: {
            type: DataTypes.STRING(255),  // Changed from TEXT to STRING
            allowNull: true
        },
        // other fields...
        SCT_ID: {
            type: DataTypes.STRING(255),  // Changed from TEXT to STRING
            allowNull: true
        }
    });

    DMICPReadReview.associate = models => {
        if (process.env.DISABLE_ASSOCIATIONS !== 'true') {
            // Associate SNOMEDCode with DMS Concept
            DMICPReadReview.belongsTo(models.SnomedDMSConcept, { foreignKey: 'SNOMEDCode', as: 'SnomedDMSConcept' });
            
            // Associate ManualMapCode, APIMapCode, etc. with International or UK concepts
            DMICPReadReview.belongsTo(models.SnomedIntConcept, { foreignKey: 'ManualMapCode',  as: 'ManualMapIntConcept' });
            DMICPReadReview.belongsTo(models.SnomedUKConcept, { foreignKey: 'ManualMapCode',  as: 'ManualMapUKConcept' });
            DMICPReadReview.belongsTo(models.SnomedIntConcept, { foreignKey: 'APIMapCode',  as: 'APIMapIntConcept' });
            DMICPReadReview.belongsTo(models.SnomedUKConcept, { foreignKey: 'APIMapCode',  as: 'APIMapUKConcept' });
            DMICPReadReview.belongsTo(models.SnomedIntConcept, { foreignKey: 'SNOMEDParent',  as: 'SnomedParentIntConcept' });
            DMICPReadReview.belongsTo(models.SnomedUKConcept, { foreignKey: 'SNOMEDParent',  as: 'SnomedParentUKConcept' });
            DMICPReadReview.belongsTo(models.SnomedDMSConcept, { foreignKey: 'SNOMEDParent',  as: 'SnomedParentDMSConcept' });
            DMICPReadReview.belongsTo(models.SnomedIntConcept, { foreignKey: 'SCT_ID',  as: 'SnomedSCTIDIntConcept' });
            DMICPReadReview.belongsTo(models.SnomedUKConcept, { foreignKey: 'SCT_ID',  as: 'SnomedSCTIDUKConcept' });
        }
    };

    return DMICPReadReview;
};
