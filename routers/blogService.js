const express = require('express')
const router = express.Router()
const apiAdapter = require('./apiAdapter')

// Define the base url for the service itself
// e.g. api.ewjresearch.com/blog
const BASE_URL = 'http://localhost:8000'
var api = apiAdapter(BASE_URL)

/**
 * Define each of the routes in the blog service
 */
router.get('/posts', async (req,res) => {
    console.log('API Gateway Posts Request Hit')
    api.get(req.path)
        .then(function(response) {
            res.send(response.data)
        })
        .catch(function(err) {
            res.send(err.message)
        })
})

module.exports = router;