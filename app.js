const express = require('express');
const mongoose = require('mongoose');

const app = express();
const dbURL = 'mongodb://localhost/CRUDex';

// database connection
mongoose.connect(dbURL, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.on('open', function() {
    console.log('connected to mongodb!')
});

// middlewares
app.use(express.json());

// routes
const booksRoute = require('./routers/books');
app.use('/books', booksRoute);


app.listen('9000', () => console.log('server started!'))