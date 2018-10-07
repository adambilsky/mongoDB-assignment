const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Create a new NoteSchema object (using this constructor)
// Set one to string, the other to Boolean
const NoteSchema = new Schema({
  body: String,
  saved: Boolean
});

// Create our model from the above schema
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;