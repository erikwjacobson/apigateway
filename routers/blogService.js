const express = require('express')
const router = express.Router()
const apiAdapter = require('./apiAdapter')
var authenticate = require('../middleware/authenticate')

// Define the base url for the service itself
// e.g. http://api.ewjresearch.com/blog
const BASE_URL = 'http://localhost:8000'
var api = apiAdapter(BASE_URL)

/**
 * Get all of posts resouce
 * No Authentication Required
 * 
 * /posts
 * 
 */
router.get('/posts', async (req,res) => {
    api.get(req.path)
    .then(function(response) {
        res.status(200).json(response.data)
    })
    .catch(function(err) {
        res.status(500).json({message: err.message})
    })
})

/**
 * Get a specific post resource
 * No Authentication Required
 * 
 * /posts/:id
 * 
 */
router.get('/posts/:id', async (req, res) => {
    api.get(req.path)
    .then(function(response) {
        res.status(200).json(response.data)
    })
    .catch(function(err) {
        res.status(500).json({message: err.message})
    })
})

/**
 * Create a new post resource
 * Authentication Required
 * 
 * /posts
 * 
 */
router.post('/posts', authenticate.authenticate, async (req,res) => {
    // Attach authenticated user to body
    req.body.user = req.user

    // Post new post
    api.post(req.path, req.body)
    .then(function(response) {
        res.status(200).json(response.data)
    })
    .catch(function(err) {
        res.status(500).json({message: err.message})
    })
})

/**
 * Update an existing post resource
 * Authentication Required
 * 
 * /posts/:id
 * 
 */
router.patch('/posts/:id', authenticate.authenticate, async (req, res) => {
    // Attach authenticated user to body
    req.body.user = req.user
    

    // Post new post
    api.patch(req.path, req.body)
    .then(function(response) {
        res.status(200).json(response.data)
    })
    .catch(function(err) {
        res.status(500).json({message: err.message})
    })
})

/**
 * Update an existing post resource
 * Authentication Required
 * 
 * /posts/:id
 * 
 */
router.delete('/posts/:id', authenticate.authenticate, async (req, res) => {
    // Attach authenticated user to body
    req.body.user = req.user

    // Post new post
    api.patch(req.path, req.body)
    .then(function(response) {
        res.status(200).json(response.data)
    })
    .catch(function(err) {
        res.status(500).json({message: err.message})
    })
})


module.exports = router;