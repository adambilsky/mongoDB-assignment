// This is our Server
// First, add dependencies

var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan") // research docs on this
var mongoose = require("mongoose");

// Second, the scraping tools
// var axios = require("axios") <-- research docs
// var fetch = require("fetch") <-- research per Ron
var cheerio = require("cheerio");

// Third, our models from the models folder (at the same level)
// This should grab ALL the model files, instead of requiring them one at a time
var db = require("./models");

// declare our port
var PORT = 3000;

// Initialize Express
var app = express();

// *** Middleware goes here ***
// logger
app.use(logger("dev"))

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
    .then(function(response) {
    //changed result to response
        // pass result to cheerio
        var $ = cheerio.load(response.data);

        // then grab specific element tags (we are using 'a' to grab link titles) and save as object
        // we use ".each()" instead of a "for loop" 
        $("").each(function(i, element) {
            // start with an empty object
            var result = {};

            // then add the info from each link as a property 
            // each title is the "text" child of each "a" tag (hyperlink)
            result.title = $(this)
                .children("a")
                .text();
            // each link is the "href" attribute of the link
            result.link = $(this)
                .children("a")
                .attr('href');

            // NOW, we create a new Article using the "result" object above just built, using the models
            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    // send errors back to client
                    return res.json(err);
                });
        });
        
        // Display if successful
        res.send("Scrape successful");
    });
});