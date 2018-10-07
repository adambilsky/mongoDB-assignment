// Require mongoose
const mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
const Schema = mongoose.Schema;

// Create a model schema to grab articles
// The schema will have three objects: 'title', 'link', and 'note'
// adding boolean for "saved"
// which each carry two key-value pairs

const ArticleSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    link: {
        type: String,
        unique: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    // 'note' holds the Note id
    // we use it to populate the Article with a Note
    note: [{
        type: Schema.Types.ObjectId
        // ref: "Note"
    }]
});

// Create the model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;