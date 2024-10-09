const { Sequelize, DataTypes } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// SNOMED International Models
db.SnomedIntConcept = require("./snomedint/Concept")(sequelize, DataTypes);
db.SnomedIntDescription = require("./snomedint/Description")(sequelize, DataTypes);
db.SnomedIntRelationship = require("./snomedint/Relationship")(sequelize, DataTypes);

// SNOMED UK Models
db.SnomedUKConcept = require("./snomeduk/Concept")(sequelize, DataTypes);
db.SnomedUKDescription = require("./snomeduk/Description")(sequelize, DataTypes);
db.SnomedUKRelationship = require("./snomeduk/Relationship")(sequelize, DataTypes);

// SNOMED DMS Models
db.SnomedDMSConcept = require("./snomeddms/Concept")(sequelize, DataTypes);
db.SnomedDMSDescription = require("./snomeddms/Description")(sequelize, DataTypes);
db.SnomedDMSRelationship = require("./snomeddms/Relationship")(sequelize, DataTypes);

// DMICP Read Review Model
db.DMICPReadReview = require("./DMICPReadReview")(sequelize, DataTypes);

// Define relationships
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
