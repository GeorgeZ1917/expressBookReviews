const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books));
});

public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let bookWithISBN = books[isbn];
  if (bookWithISBN != undefined) {
    res.send(`<div><span>Author: </span>${bookWithISBN.author}<br/><span>Title: </span>${bookWithISBN.title}<br/><span>Reviews: </span>${JSON.stringify(bookWithISBN.reviews)}</div>`);
  } else {
    return res.send("The book with the ISBN was not found.");
  }
 });
  
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const keys = Object.keys(books);
  let booksFromAuthor = [];

  for (let i = 0; i < keys.length; i++) {
    if (books[keys[i]].author == author) {
      booksFromAuthor.push(books[keys[i]]);
    }
  }
  if (booksFromAuthor.length > 0) {
    let bookDetails = "";
    booksFromAuthor.forEach(b => {
      bookDetails += `<div><span>Author: </span>${b.author}<br/><span>Title: </span>${b.title}<br/><span>Reviews: </span>${JSON.stringify(b.reviews)}</div><br/><br/>`;
    });
    res.send(bookDetails);
  } else {
    return res.send(`The book(s) with the '${author}' author was not found.`);
  }
});

public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const keys = Object.keys(books);
  let booksFromTitle = [];
  
  for (let i = 0; i < keys.length; i++) {
    if (books[keys[i]].title == title) {
      booksFromTitle.push(books[keys[i]]);
    }
  }
  if (booksFromTitle.length > 0) {
    let bookDetails = "";
    booksFromTitle.forEach(b => {
      bookDetails += `<div><span>Author: </span>${b.author}<br/><span>Title: </span>${b.title}<br/><span>Reviews: </span>${JSON.stringify(b.reviews)}</div><br/><br/>`;
    });
    res.send(bookDetails);
  } else {
    return res.send(`The book(s) with the '${title}' title was not found.`);
  }
});

public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book != undefined) {
    const keys = Object.keys(book.reviews);
    let bookReviewsFromISBN = [];

    for (let i = 0; i < keys.length; i++) {
      bookReviewsFromISBN.push(book[keys[i]]);
    }

    if (bookReviewsFromISBN.length > 0) {
      let bookReviews = "";
      bookReviewsFromISBN.forEach(b => {
        bookReviews += `<div><span>Review: </span>${b}<br/><span><br/><br/>`;
      });

      res.send(bookReviews);
    } else {
      return res.send(`The book with the '${isbn}' ISBN has 0 reviews.`);
    }
  } else {
    return res.send(`The book with the '${isbn}' ISBN was not found.`);
  }
});

module.exports.general = public_users;
