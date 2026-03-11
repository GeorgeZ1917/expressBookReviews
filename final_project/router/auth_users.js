const express = require('express');
const session = require('express-session')
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username, password) => {
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization['username'];
    const review = req.body.review;
    let bookWithISBN = books[isbn];
    
    if (bookWithISBN != undefined) {
        bookWithISBN.reviews[username] = review;
        res.send(bookWithISBN);
    } else {
        return res.send("The book with the ISBN was not found.");
    }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization['username'];
    let bookWithISBN = books[isbn];
    
    if (bookWithISBN != undefined) {
        bookWithISBN.reviews[username] = undefined;
        res.send(bookWithISBN);
    } else {
        return res.send("The book with the ISBN was not found.");
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.doesExist = doesExist;
module.exports.authenticatedUser = authenticatedUser;
module.exports.users = users;
