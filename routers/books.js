const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch(err) {
        res.send('Error 404 ' + err);
    }
});

router.post('/', async (req, res) => {
    console.log('req', req.body);
    const book = new Book({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        author: req.body.author 
    });
    try {
       const savedBook = await book.save();
       res.json(savedBook); 
    } catch(err) {
        res.send('Error 404 ' + err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const singleBook = await Book.findById(req.params.id);
        res.json(singleBook);
    } catch(err) {
        res.send('Error 404 ' + err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const singleBook = await Book.findOneAndUpdate({_id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        });
        res.json(singleBook);
    } catch(err) {
        res.send('Error 404 ' + err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const singleBook = await Book.remove({_id: req.params.id });
        res.json(singleBook);
    } catch(err) {
        res.send('Error 404 ' + err);
    }
});

module.exports = router