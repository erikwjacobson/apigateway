require('dotenv').config();
const axios = require('axios')
var express = require('express');
var mongoose = require('mongoose')
var app = express();
var blogRouter = require('./routers/blogService')
var authRouter = require('./routers/authentication')
var cookieParser = require('cookie-parser')
var authenticate = require('./middleware/authenticate')


// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json())
app.use(express.urlencoded());
app.use(cookieParser())

 
axios.interceptors.request.use(request => {
    console.log('Starting Request', request)
    return request;
})  

// Define authentication router
app.use(authRouter);

// Use authenticate for each request
app.use(authenticate.authenticate)

// Define Each Microservice Router
app.use(blogRouter);


app.listen(3000, () => console.log('apigateway server started!'));