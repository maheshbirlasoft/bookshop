const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
return users.some(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
return users.find(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const {username,password} = req.body
  const authenticate = authenticatedUser(username,password)

  if(!authenticate){
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: authenticate.username }, "fingerprint_customer", { expiresIn: '1h' });
  req.session.token = token;
  return res.status(200).json({ message: 'Login successful', token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const book = books
  
  book[req.params.isbn].reviews[req.user.username] = req.body.review

  console.log(JSON.stringify(books[req.params.isbn]))
  return res.status(200).json(book[req.params.isbn].reviews);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const book = books[req.params.isbn].reviews
    delete book[req.user.username]
    return res.status(200).json({message : "reviews deleted successfully"});
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
