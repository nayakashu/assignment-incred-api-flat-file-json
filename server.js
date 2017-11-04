/**
 * app.js -> Entry point for the APIFlatFileJSON and the server
 */

var express = require('express'),
    bodyParser = require('body-parser');

// Instantiate Express
var app = express();

// Configure bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================
var writeToFlatFile = require('./routes/flatFileRouter')();

// REGISTER ROUTES -------------------------------
// All of the routes will be prefixed with /api
app.use('/api', writeToFlatFile);

// Route for GET request
app.get('/', function(req, res) {
    res.json({ "Status": "API Flat File JSON is running at port: " + port });
});

// Configure the server port
var port = process.env.PORT || 3030;

// START THE SERVER
// =============================================================================
app.listen(port, function() {
    console.log('API Flat File JSON is running at port: ' + port);
});