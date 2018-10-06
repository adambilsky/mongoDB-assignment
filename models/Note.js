const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Create a new NoteSchema object (using this constructor)
// Set both items in the object to be strings
const NoteSchema = new Schema({
  note: String
});

// Create our model from the above schema
const Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;