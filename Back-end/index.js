require("dotenv").config(); // Load environment variables from a .env file into process.env
const config = require("./config.json"); // Import configuration from a JSON file
const mongoose = require('mongoose'); // Import the mongoose library for MongoDB interactions

mongoose.connect(config.connectionString); // Connect to the MongoDB database using the connection string from the config
const User = require('./models/user.model'); // Import the User model
const Note = require('./models/Note.model'); // Import the Note model
const express = require('express'); // Import the Express library for creating the server
const cors = require('cors'); // Import the CORS middleware for handling Cross-Origin Resource Sharing
const app = express(); // Create an instance of the Express application
const port = process.env.PORT || 10000; // Define the port number from environment variables or default to 10000
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for creating and verifying JWTs
const { authenticateToken } = require("./utilities"); // Import the authenticateToken middleware from the utilities module

app.use(express.json()); // Middleware to parse incoming JSON requests

app.use(cors({
    origin: '*' // Enable CORS for all origins
}));


// create Account
app.post("/create-account", async (req, res) => { // Define a POST endpoint for creating a new user account
    const { fullName, email, password } = req.body; // Destructure the request body to get fullName, email, and password

    if (!fullName) { // Check if fullName is provided
        return res
            .status(400) // Send a 400 Bad Request status
            .json({ error: true, message: "Full name is required" }); // Return a JSON response with an error message
    }
    if (!email) { // Check if email is provided
        return res
            .status(400) // Send a 400 Bad Request status
            .json({ error: true, message: "Email is required" }); // Return a JSON response with an error message
    }
    if (!password) { // Check if password is provided
        return res
            .status(400) // Send a 400 Bad Request status
            .json({ error: true, message: "Password is required" }); // Return a JSON response with an error message
    }

    const isUser = await User.findOne({ email: email }); // Check if a user with the provided email already exists
    if (isUser) { // If user already exists
        return res.json({
            error: true,
            message: "User already exists",
        });
    }

    const user = new User({
        fullName, // Set the fullName field of the new user
        email, // Set the email field of the new user
        password, // Set the password field of the new user
    }); // Create a new user instance

    await user.save(); // Save the new user to the database

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    }); // Generate a JWT for the new user

    return res.json({
        error: false, // No error
        user, // Return the created user
        accessToken, // Return the generated access token
        message: "Registration successful", // Return a success message
    });
});

//login-account
app.post("/login", async (req, res) => { // Define a POST endpoint for user login
    const { email, password } = req.body; // Destructure the request body to get email and password

    if (!email) { // Check if email is provided
        return res.status(400).json({ message: "Email is required" }); // Send a 400 Bad Request status with an error message
    }
    if (!password) { // Check if password is provided
        return res.status(400).json({ message: "Password is required" }); // Send a 400 Bad Request status with an error message
    }

    const userInfo = await User.findOne({ email: email }); // Find a user with the provided email
    if (!userInfo) { // If user not found
        return res.status(400).json({ message: "User not found" }); // Send a 400 Bad Request status with an error message
    }
    if (userInfo.email == email && userInfo.password == password) { // Check if the provided email and password match the found user
        const user = { user: userInfo }; // Create a user object containing the found user's info
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        }); // Generate a JWT for the user

        return res.json({
            error: false, // No error
            message: "Login successful", // Return a success message
            email, // Return the email
            accessToken, // Return the generated access token
        });
    } else {
        return res.status(400).json({
            error: true,
            message: "Invalid credentials" // Return an error message for invalid credentials
        });
    }
});

//get-user
app.get("/get-user", authenticateToken, async (req, res) => { // Define a GET endpoint to retrieve user information, protected by the authenticateToken middleware
    const { user } = req.user; // Destructure the user object from the authenticated request
    const isUser = await User.findOne({ _id: user._id }); // Find the user in the database by their ID

    if (!isUser) { // Check if the user is found
        return res.sendStatus(401); // If not found, send a 401 Unauthorized status
    }
    
    return res.json({
        error: false, // No error
        user: { // Return the user information
            fullName: isUser.fullName, // User's full name
            email: isUser.email, // User's email
            "_id": isUser._id, // User's ID
            createdOn: isUser.createdOn // User's creation date
        },
        message: "" // No message
    });
});

//Add-note
app.post("/add-note", authenticateToken, async (req, res) => { // Define a POST endpoint to add a new note, protected by the authenticateToken middleware
    const { title, content, tags } = req.body; // Destructure the request body to get title, content, and tags
    const { user } = req.user; // Destructure the user object from the authenticated request

    if (!title) { // Check if title is provided
        return res.status(400).json({ // Send a 400 Bad Request status with an error message
            error: true,
            message: "Title is required"
        });
    }
    if (!content) { // Check if content is provided
        return res.status(400).json({ // Send a 400 Bad Request status with an error message
            error: true,
            message: "Content is required"
        });
    }

    try {
        const note = new Note({ // Create a new note instance
            title, // Set the title field of the new note
            content, // Set the content field of the new note
            tags: tags || [], // Set the tags field of the new note or use an empty array if not provided
            userId: user._id, // Set the userId field of the new note to the ID of the authenticated user
        });
        await note.save(); // Save the new note to the database
        return res.json({ // Send a JSON response with no error and the added note
            error: false,
            note,
            message: "Note added successfully"
        });
    } catch (error) { // Catch any errors that occur during the process
        console.error(error); // Log the error to the console
        return res.status(500).json({ // Send a 500 Internal Server Error status with an error message
            error: true,
            message: "Internal Server Error"
        });
    }
});

//edit-note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => { // Define a PUT endpoint to edit a note, protected by the authenticateToken middleware
    const noteId = req.params.noteId; // Extract the noteId from the request parameters
    const { title, content, tags, isPinned } = req.body; // Destructure the request body to get title, content, tags, and isPinned
    const { user } = req.user; // Destructure the user object from the authenticated request

    if (!title && !content && !tags) { // Check if no changes are provided
        return res.status(400).json({ // Send a 400 Bad Request status with an error message
            error: true,
            message: "No changes provided"
        });
    }
    
    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id }); // Find the note by ID and user ID

        if (!note) { // If note not found
            return res.status(404).json({ // Send a 404 Not Found status with an error message
                error: true,
                message: "Note not found"
            });
        }

        if (title) note.title = title; // Update the title if provided
        if (content) note.content = content; // Update the content if provided
        if (tags) note.tags = tags; // Update the tags if provided
        if (isPinned) note.isPinned = isPinned; // Update the isPinned status if provided

        await note.save(); // Save the updated note to the database
        return res.json({ // Send a JSON response with no error and the updated note
            error: false,
            note,
            message: "Note updated successfully",
        });
    }catch (error) { // Catch any errors that occur during the process
        console.error(error); // Log the error to the console
        return res.status(500).json({ // Send a 500 Internal Server Error status with an error message
            error: true,
            message: "Internal Server Error"
        });
    }
});
//get-all-notes
app.get("/get-all-notes", authenticateToken, async (req, res) => { // Define a GET endpoint to retrieve all notes, protected by the authenticateToken middleware
    const { user } = req.user; // Destructure the user object from the authenticated request

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 }); // Find all notes belonging to the authenticated user and sort them by isPinned status
        return res.json({ // Send a JSON response with no error and the retrieved notes
            error: false,
            notes,
            message: "All notes retrieved successfully"
        });
    } catch (error) { // Catch any errors that occur during the process
        return res.status(500).json({ // Send a 500 Internal Server Error status with an error message
            error: true,
            message: "Internal Server Error"
        });
    }
});

//delete-notes
app.delete("/delete-notes/:noteId", authenticateToken, async (req, res) => { // Define a DELETE endpoint to delete a note, protected by the authenticateToken middleware
    const noteId = req.params.noteId; // Extract the noteId from the request parameters
    const { user } = req.user; // Destructure the user object from the authenticated request

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id }); // Find the note by ID and user ID

        if (!note) { // If note not found
            return res.status(404).json({ // Send a 404 Not Found status with an error message
                error: true,
                message: "Note not found"
            });
        }

        await Note.deleteOne({ _id: noteId, userId: user._id }); // Delete the note
        return res.json({ // Send a JSON response with no error and a success message
            error: false,
            message: "Note deleted successfully"
        });
    } catch (error) { // Catch any errors that occur during the process
        return res.status(500).json({ // Send a 500 Internal Server Error status with an error message
            error: true,
            message: "Internal Server Error"
        });
    }
});

//Update isPinned Value
app.put("/Update-note-pinned/:noteId", authenticateToken, async (req, res) => { // Define a PUT endpoint to update the pinned status of a note, protected by the authenticateToken middleware
    const noteId = req.params.noteId; // Extract the noteId from the request parameters
    const { isPinned } = req.body; // Destructure the isPinned field from the request body
    const { user } = req.user; // Destructure the user object from the authenticated request

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id }); // Find the note by ID and user ID

        if (!note) { // If note not found
            return res.status(404).json({ // Send a 404 Not Found status with an error message
                error: true,
                message: "Note not found"
            });
        }

        note.isPinned = isPinned; // Update the isPinned field of the note

        await note.save(); // Save the updated note to the database

        return res.json({ // Send a JSON response with no error and the updated note
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (error) { // Catch any errors that occur during the process
        console.error(error); // Log the error to the console
        return res.status(500).json({ // Send a 500 Internal Server Error status with an error message
            error: true,
            message: "Internal server error"
        });
    }
});

app.get("/search-notes", authenticateToken, async (req, res) => { // Define a GET endpoint to search for notes, protected by the authenticateToken middleware
    const { user } = req.user; // Destructure the user object from the authenticated request
    const { query } = req.query; // Extract the query parameter from the request query string

    console.log("Incoming request", req.query); // Log the incoming request query to the console

    if (!query) { // Check if no search query is provided
        console.log("No search query provided"); // Log a message to the console
        return res.status(400).json({ // Send a 400 Bad Request status with an error message
            error: true,
            message: "Search query is required"
        });
    }

    try {
        const matchingNotes = await Note.find({ // Search for notes that match the search query
            userId: user._id, // Match notes belonging to the authenticated user
            $or: [ // Perform a logical OR operation
                { title: { $regex: new RegExp(query, "i") } }, // Match notes with titles containing the search query (case-insensitive)
                { content: { $regex: new RegExp(query, "i") } }, // Match notes with content containing the search query (case-insensitive)
            ],
        });

        return res.json({ // Send a JSON response with no error and the matching notes
            error: false,
            notes: matchingNotes,
            message: "Notes matching the search query retrieved successfully"
        });
    } catch (error) { // Catch any errors that occur during the process
        console.log("Error during the note search", error); // Log the error to the console
        return res.status(500).json({ // Send a 500 Internal Server Error status with an error message
            error: true,
            message: "Internal Server Error"
        });
    }
});

app.listen(port, '0.0.0.0', () => { // Start the server and listen on the specified port and IP address
    console.log(`Server is running on port ${port}`); // Log a message to the console indicating that the server is running
});
