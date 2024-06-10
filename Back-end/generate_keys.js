const crypto = require('crypto'); // Import the built-in 'crypto' module for cryptographic operations

const key1 = crypto.randomBytes(32).toString('hex'); // Generate 32 random bytes and convert them to a hexadecimal string
console.log(key1); // Output the generated key to the console
