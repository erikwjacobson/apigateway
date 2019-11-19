require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const blogRouter = require('./routers/blogService')

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json())

// Define Each Microservice Router
app.use(blogRouter);

app.listen(3000, () => console.log('apigateway server started!'));