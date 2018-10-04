var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Create a new NoteSchema object (using this constructor)
// Set both items in the object to be strings
var NoteSchema = new Schema({
  title: String,
  body: String
});

// Create our model from the above schema
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;