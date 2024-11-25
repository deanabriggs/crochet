// Require resources
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// Set database holder
let database;

// Establish database connection or return existing connection
const initDb = (callback => {
    // Return the existing connection to the database without an error
    if(database) {
        console.log('Database connection is already initialized');
        return callback(null, database);
    }

    // Establish a connection to the database
    MongoClient.connect(process.env.MONGODB_URL)
    // If connection returns a result, return the database without an error
    .then((client) => {
        database = client;
        callback(null, database);
    // If there is an error connecting to the database, return just the error
    })
    .catch((err) => {
        callback(err);
    })
})

const getDb = () => {
    if (!database) {
        throw Error('Database not initialized')
    }
    return database
}

// Export the functions to initialize and get the database
module.exports = {
    initDb,
    getDb
}