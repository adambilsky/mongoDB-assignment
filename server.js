// -------------------------------
// *** Dependency Declarations ***
// -------------------------------
const express = require("express"); // to run our server
const bodyParser = require("body-parser"); // for parsing json objects
const logger = require("morgan"); // research docs on this
const mongoose = require("mongoose"); // database handler
const axios = require("axios"); // Scraping tools
const cheerio = require("cheerio"); // Scraping tools
const db = require("./models"); // Require our models from the models folder
const PORT = process.env.PORT || 3000; // declare our port

// ---------------------------------------------
// *** Initialize Express and related files ****
// ---------------------------------------------
const app = express();
app.use(logger("dev")) // *** middleware ***
app.use(bodyParser.urlencoded({ extended: true })); // body-parser for forms
app.use(express.static("public")); // serve public folder as a static directory

// ---------------------------
// *** Connect to Mongo DB ***
// ---------------------------
const config = require("./config/database");
mongoose.Promise = Promise;
mongoose.connect(config.database);

// ---------------------------
// *** Routes Declarations ***
// ---------------------------

// *** Home route ***
app.get('/', function(req, res) {
    console.log('here');
    res.send('hello')
})

// *** Scraping (GET) route for the reddit webdev site ***
// -------------------------------------------------------
app.get("/scrape", function (req, res) {
    console.log("The scrape route works");
    // use axios to grab the body of the target HTML
    axios.get("https://old.reddit.com/r/webdev/")
    // get body of html
    .then(function (response) {
        // pass result to cheerio
        var $ = cheerio.load(response.data);
        // console.log(response); removed because of excessively long console.log
        // then grab specific element tags (we are using 'a' to grab link titles) and save as object
        $("p.title").each(function (i, element) {
            // declare empty object
            let result = {};

            // then add the info from each link as a property 
            // each title is the "text" child of each "a" tag (hyperlink)
            result.title = $(this)
                .children("a")
                .text();
            // each link is the "href" attribute of the link
            result.link = $(this)
                .children("a")
                .attr("href");
            console.log(result); // this successfully logs the article objects. they also appear in the db 
            // once they have been scraped, however, they will result in errors if they are not cleared before rescraping...

            // NOW, we create a new Article using the "result" object above just built, using the models
            // the articles appear in the db as of 5:00 PM, Saturday 10/6
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // send errors back to client
                    return res.json(err);
                });
        });

        // Display if successful
        res.send("Scrape successful");
    });
});

// *** Retrieval route (GET): all the articles in the scraperdb ***
// ----------------------------------------------------------------

app.get("/articles", function (req, res) {

    // First get all the documents in the Articles "collection"
    db.Article.find({})
        .then(function (dbArticle) {
            // If successful, send them back to the client
            res.json(dbArticle);
        })
        // Send any errors that occurred
        .catch(function (err) {
            res.json(err);
        });
})

// *** Retrieval route (GET) for specific Articles by id to include the note ***
// -----------------------------------------------------------------------------

app.get("/articles/:id", function (req, res) {

    // Build a query using the id param and findOne method to match the one in scraperdb
    db.Article.findOne({ _id: req.params.id })
        // use the "populate" method to include all notes
        .populate("note")
        .then(function (dbArticle) {
            // Send back a successful get to the client
            res.json(dbArticle);
        })
        // Send back any errors
        .catch(function (err) {
            res.json(err);
        });
});

// *** Save/Update (POST) Route for notes (using the specific id) ***
// ------------------------------------------------------------------
app.post("/articles/:id", function (req, res) {
    console.log(req.body);
    // Create a new note and pass the body
    db.Note.create(req.body)
        .then(function (dbNote) {
            console.log(dbNote);
            // Since the query normally returns the original id, we need to update it with a { new: true } param using findOneAndUpdate
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: dbNote._id }}, { new: true });
        })
        // Send updated article to the client
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        // Send back any errors
        .catch(function (err) {
            res.json(err);
        });
});

// ------------------------
// *** Start the server ***
// ------------------------

app.listen(PORT, function () {
    console.log(`App running on port ${PORT}!`)
})