// This is our Server
// First, add dependencies

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan") // research docs on this
var mongoose = require("mongoose");

// Second, the scraping tools
// var axios = require("axios") <-- research docs
var cheerio = require("cheerio");

// Third, our models from the models folder (at the same level)
var db = require("./models");

// declare our port
var PORT = 3000;

// Initialize Express
var app = express();

// *** Middleware goes here ***
// logger

// body-parser for forms
app.use(bodyParser.urlencoded);

// serve public folder as a static directory
// avoids 404 message
app.use(express.static("public"));

// Connect to Mongo DB
mongoose.Promise = Promise;
mongoose.connect(//"name of server here"//
);

// Routes

// A GET route for scraping the ... site
app.get("/scrape", function(req, res) {
    // get body of html
    .then(function(result) {
        // pass result to cheerio
        var $ = cheerio.load(result.data);

        // then grab specific tags (h2, h4, etc) and save as object
    }
})