const mongoose = require('mongoose'); // Import the mongoose library for MongoDB interactions
const Schema = mongoose.Schema; // Create a shorthand for the mongoose Schema constructor

// Define the schema for a 'Note'
const noteSchema = new Schema({
    title: { // Title of the note
        type: String, // Data type is String
        required: true // This field is mandatory
    },
    content: { // Content of the note
        type: String, // Data type is String
        required: true // This field is mandatory
    },
    tags: { // Tags associated with the note
        type: [String], // Data type is an array of Strings
        default: [] // Default value is an empty array
    },
    isPinned: { // Pin status of the note
        type: String, // Data type is String (should be Boolean for true/false values)
        default: false // Default value is false (note is not pinned)
    },
    userId: { // ID of the user who created the note
        type: String, // Data type is String
        required: true // This field is mandatory
    },
    createdOn: { // Timestamp of when the note was created
        type: Date, // Data type is Date
        default: new Date().getTime() // Default value is the current date and time
    },
});

// Export the Note model based on the noteSchema
module.exports = mongoose.model("Note", noteSchema);
