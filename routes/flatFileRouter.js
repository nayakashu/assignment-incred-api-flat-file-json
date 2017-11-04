/**
 * flatFileRouter.js -> API router for writing into the flat file with JSON extension
 */

var express = require('express'),
    fs = require('fs');

var routes = function() {
    
    var flatFileRouter = express.Router();

    // Route 1 - write to Separate Flat Files by generating different file names using system timestamp
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    flatFileRouter.route('/writeToSeparateFlatFiles')

    // Create a new brand
    .post(function(req, res) {
        
        if(!req.body.hasOwnProperty('jsonData')) {
            res.json({ "Status": "POST request doesn't has jsonData property!" });
            return;
        }

        // Params comes from request body
        var jsonData = req.body.jsonData;

        // Get the system timestamp in a readable format to generate multiple output files
        var now = new Date().getTime();

        var outputJSONFileName = 'outputJSON - ' + now +  '.json';

        fs.appendFile(outputJSONFileName, JSON.stringify(jsonData), function (err) {
            if (err) {
                res.json({ "Status": "Write to File Error!" });
                console.log('Write to File Error!');
            } else {
                res.json({ "Status": "Write to File Successful!" });
                console.log('Write to File Successful!');
            }
        });
    })

    .get(function(req, res) {
        res.json({ "Status": "GET Request - writeToSeparateFlatFiles" });
    });

    // Route 2 - write to a Single Flat File
    ////////////////////////////////////////
    flatFileRouter.route('/writeToSingleFlatFile')
    
    .post(function(req, res) {
        
        if(!req.body.hasOwnProperty('jsonData')) {
            res.json({ "Status": "POST request doesn't has jsonData property!" });
            return;
        }

        // Params comes from request body
        var jsonData = req.body.jsonData;

        fs.appendFile('outputJSON.json', JSON.stringify(jsonData) + '\n', function (err) {
            if (err) {
                res.json({ "Status": "Write to File Error!" });
                console.log('Write to File Error!');
            } else {
                res.json({ "Status": "Write to File Successful!" });
                console.log('Write to File Successful!');
            }
        });
    })

    .get(function(req, res) {
        res.json({ "Status": "GET Request - writeToSingleFlatFile" });
    });

    return flatFileRouter;
};

module.exports = routes;