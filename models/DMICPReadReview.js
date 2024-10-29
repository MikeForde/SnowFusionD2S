module.exports = (sequelize, DataTypes) => {
    const DMICPReadReview = sequelize.define("DMICPReadReview", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
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
            type: DataTypes.STRING(255),
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
            type: DataTypes.STRING(255),
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
            type: DataTypes.STRING(255),
            allowNull: true
        },
        APIMapTerm: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        SNOMEDCode: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        SNOMEDParent: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ParentInDataset: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ParentsDecision: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Parent: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Parent_Term: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        DecisionForSCTParent: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        ManualParentCode: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ManualParentFSN: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        APISelectedParentCode: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        APISelectedParentFSN: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        SNOMED_Parent_CHS: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        SNOMED_Parent_CHS_Term: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Parent1Code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        Parent1Term: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Parent2Code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        Parent2Term: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Parent3Code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        Parent3Term: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Parent4Code: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        Parent4Term: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        CGI_Read: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        SNOMED_ChildOf_in_INT: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        SNOMED_ChildOf_in_UK: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        SCT_ID: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        ChildOf_Hash: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Value_required: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        UsageCount: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Templates: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        TemplateNames: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Searches: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        SearchNames: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Documents: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        DocumentNames: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Cat: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Cat2: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        PreviousParentIfChanged: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        Comments: {
            type: DataTypes.TEXT,
            allowNull: true
        },
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
