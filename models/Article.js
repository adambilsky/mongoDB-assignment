// Require mongoose
var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Create a model schema to grab articles
// The schema will have three objects: 'title', 'link', and 'note'
// which each carry two key-value pairs

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // 'note' holds the Note id
    // we use it to populate the Article with a Note
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

// Create the model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;