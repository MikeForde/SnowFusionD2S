require("dotenv").config();
const express = require("express");
const axios = require('axios');
const cors = require("cors");
const path = require("path");
const xmlparser = require("express-xml-bodyparser");
const { Sequelize } = require("sequelize");
const db = require("./models");  // import the models

// const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST } = process.env;

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//     host: DB_HOST,
//     dialect: 'mysql'
// });

// sequelize.authenticate()
//     .then(() => console.log("DB connection successful"))
//     .catch(console.error);

const api = express();
api.use(cors()); // enable CORS on all our requests 
api.use(express.json()); // parses incoming requests with JSON payloads
api.use(express.urlencoded({ extended: false })); // parses incoming requests with urlencoded payloads
api.use(express.text());
api.use(xmlparser());

// Sync Sequelize models
db.sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
}).catch(console.error);

// API POST - CRUD Create/Convert

// API GET - CRUD Read
  
// API PUT - CRUD Update

// API DELETE - CRUD Delete

api.use(express.static(path.join(__dirname, "client", "build")));
api.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;
api.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});
