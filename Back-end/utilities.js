const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for handling JSON Web Tokens

function authenticateToken(req, res, next) { // Define a middleware function named authenticateToken
    const authHeader = req.headers["authorization"]; // Get the Authorization header from the request
    const token = authHeader && authHeader.split(" ")[1]; // Extract the token from the Authorization header

    if (!token) // If no token is provided
        return res.sendStatus(401); // Send a 401 Unauthorized status

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => { // Verify the token using the secret key
        if (err) // If there is an error while verifying the token
            return res.sendStatus(401); // Send a 401 Unauthorized status

        req.user = user; // Attach the user object decoded from the token to the request object
        next(); // Call the next middleware function in the stack
    });
}

module.exports = { authenticateToken }; // Export the authenticateToken middleware function
