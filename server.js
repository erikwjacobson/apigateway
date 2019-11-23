require('dotenv').config();
const axios = require('axios')
var express = require('express');
var mongoose = require('mongoose')
var app = express();
var blogRouter = require('./routers/blogService')
var authRouter = require('./routers/authentication')
var cookieParser = require('cookie-parser')


// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

/**
 * Define gateway routers 
 */ 
app.use(authRouter);

/**
 * Microservices
 */
app.use(blogRouter);


app.listen(3000, () => console.log('apigateway server started!'));