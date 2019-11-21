const express = require('express')
const router = express.Router()
const apiAdapter = require('./apiAdapter')
var authenticate = require('../middleware/authenticate')

// Define the base url for the service itself
// e.g. http://api.ewjresearch.com/blog
const BASE_URL = 'http://localhost:8000'
var api = apiAdapter(BASE_URL)

/**
 * Define each of the routes in the blog service
 */
router.get('/posts', async (req,res) => {
    api.get(req.path, req.body)
    .then(function(response) {
        res.send(response.data)
    })
    .catch(function(err) {
        res.send(err.message)
    })
})

router.post('/posts', authenticate.authenticate, async (req,res) => {
    req.body.user = req.user
    api.post(req.path, req.body)
    .then(function(response) {
        res.send(response.data)
    })
    .catch(function(err) {
        res.send(err.message)
    })
})

module.exports = router;