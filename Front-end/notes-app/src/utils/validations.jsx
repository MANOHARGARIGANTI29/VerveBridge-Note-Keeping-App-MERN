// Function to validate an email address using a regular expression
export const ValidateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression pattern for email validation
    return regex.test(email); // Returning true if the email matches the pattern, false otherwise
};

// Function to extract initials from a given username
export const GetInitials = (Username) => {
    if (!Username) return ""; // If username is empty or undefined, return an empty string

    const words = Username.split(" "); // Splitting the username into an array of words
    let initials = " "; // Initializing initials variable

    // Looping through the words array and extracting the first character of each word
    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0]; // Appending the first character of each word to the initials
    }
    return initials.toUpperCase(); // Returning the initials in uppercase
};
