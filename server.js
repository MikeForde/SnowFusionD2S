require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const xmlparser = require("express-xml-bodyparser");
const db = require("./models");  // import the models
const snomedRouter = require("./routes/snomedRouter"); // Import the router
const reviewRouter = require("./routes/reviewRouter"); // Import the router

const shouldSyncDb = String(process.env.DB_SYNC).toLowerCase() === "true";

const api = express();
api.use(cors()); // enable CORS on all our requests 
api.use(express.json()); // parses incoming requests with JSON payloads
api.use(express.urlencoded({ extended: false })); // parses incoming requests with urlencoded payloads
api.use(express.text());
api.use(xmlparser());

// Use the snomedRouter for all SNOMED-related API endpoints
api.use('/snomed', snomedRouter);

/// Use the reviewRouter for all DMICP-Read-Review-related API endpoints
api.use('/review', reviewRouter);

api.use(express.static(path.join(__dirname, "client", "build")));
api.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5000;

async function startServer() {
    try {
        await db.sequelize.authenticate();

        if (shouldSyncDb) {
            await db.sequelize.sync({ force: false });
            console.log('Database tables synchronized.');
        } else {
            console.log('Database sync skipped because DB_SYNC is not true.');
        }

        api.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
}

startServer();
