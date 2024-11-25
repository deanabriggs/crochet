// Require resources
const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');

// Start an exppress application
const app = express();

// Set a variable for port access
const port = process.env.PORT || 8000;

// Start the application
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));

// Connect to Database and listen on Port
mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {
            console.log(`Database is listening and node is running on port ${port}`);
        });
    }
});