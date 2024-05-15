const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const {username,password} = req.body
    //Write your code here
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    if (isValid(username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    users.push({ username, password });

    return res.status(201).json({ message: 'User registered successfully' });

});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here

    return res.status(200).json(books);
});



// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here

    return res.status(200).json(books[req.params.isbn]);
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    const autho_books = Object.entries(books)
    const filteredBooksArray = autho_books.filter(([key, book]) => book.author === req.params.author)
    return res.status(300).json(filteredBooksArray);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    const autho_books = Object.entries(books)
    const filteredBooksArray = autho_books.filter(([key, book]) => book.title === req.params.title)
    return res.status(300).json(filteredBooksArray);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    return res.status(200).json(books[req.params.isbn]['reviews']);
});

module.exports.general = public_users;
