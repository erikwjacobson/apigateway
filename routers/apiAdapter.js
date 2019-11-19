const axios = require('axios')

// Defines the axios request based on the base url given
module.exports = (baseURL) => {
    return axios.create({
        baseURL: baseURL,
    })
}