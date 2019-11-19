require('dotenv').config();
const express = require('express')
const jwt = require('jsonwebtoken')

/**
 * Authenticate each request to the api gateway
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function authenticate(req, res, next) {
    console.log('Authentication function hit.');

    // Get token secret to verify jwt
    const tokenSecret = process.env.APP_KEY

    // Get token from cookie
    const {token} = req.cookies;

    // Clear Token Function
    function clearTokenAndNext() {
        res.clearCookie("token");
        res.status(403).json({message: 'User does not have permission to access this route.'})
    }

    // Skip if there's no token
    if(!token) {
        return clearTokenAndNext()
    }

    // Verify the jwt given in the cookie
    jwt.verify(token, tokenSecret, function(err, decodedToken) {
        if (err) {
            return clearTokenAndNext()
        }

        if(decodedToken.exp <= Date.now() / 1000) {
            return clearTokenAndNext()
        }

        // Attach user to request
        // req.user = decodedToken.user
        console.log('JWT Verified')
        next();
    })
}

module.exports.authenticate = authenticate