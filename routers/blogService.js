const express = require('express')
const router = express.Router()
const apiAdapter = require('./apiAdapter')

// Define the base url for the service itself
// e.g. api.ewjresearch.com/blog
const BASE_URL = 'localhost:3000' 
const api = apiAdapter(BASE_URL)

/**
 * Define each of the routes in the blog service
 */
router.get('/posts', (req,res) => {
    api.get(req.path).then(resp => {
        res.send(resp.data)
    }).catch(function(err) {
        res.send(err.message)
    })
})

module.exports = router;