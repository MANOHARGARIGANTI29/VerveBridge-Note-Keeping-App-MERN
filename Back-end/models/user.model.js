const mongoose = require('mongoose'); // Import the mongoose library for MongoDB interactions

const Schema = mongoose.Schema; // Create a shorthand for the mongoose Schema constructor

// Define the schema for a 'User'
const userSchema = new Schema({
    fullName: { // Full name of the user
        type: String // Data type is String
    },
    email: { // Email address of the user
        type: String // Data type is String
    },
    password: { // Password for the user account
        type: String // Data type is String
    },
    createdOn: { // Timestamp of when the user account was created
        type: Date, // Data type is Date
        default: new Date().getTime() // Default value is the current date and time
    },
});

module.exports = mongoose.model("User", userSchema); // Export the User model based on the userSchema
