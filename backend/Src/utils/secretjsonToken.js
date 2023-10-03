const jwt = require('jsonwebtoken');
const secretKey = process.env.Token_key; // Your secret key stored in an environment variable

// Create a JWT token when a user logs in or registers
module.exports.createSecretToken = (id) => {

  // Sign the token
  return jwt.sign({id}, secretKey, {expiresIn: 3 * 24 * 60 * 60,}); 
};