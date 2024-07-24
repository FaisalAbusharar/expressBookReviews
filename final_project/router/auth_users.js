const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
  {id: 1, username: 'Faisal', password: 'pwd123'}
];

const isValid = (username)=>{ 
  return users.find(user=>user.username===username && user.password === password)
}

const authenticatedUser = (username,password)=>{

  let usersList = Object.values(users);
  let user = usersList.find(b => b.username==username)
 if (user) {

   if (users.password === password) {

     return true;
   }
 }

 return false;
}

regd_users.post("/login", (req,res) => {
 const { username, password } = req.body;


 if (!username || !password) {
   return res.status(400).json({ message: 'Please provide a valid username and password' });
 }
 const user = users.find(u => u.username === username && u.password === password);


 if (username === user.username && password === user.password) {
   const accessToken = jwt.sign({ username, userPassword: password }, "secretKey", { expiresIn: '1h' });


   req.session.accessToken = accessToken;

   return res.status(200).json({ message: 'Login successful',accessToken });
 } else {
   return res.status(401).json({ message: 'Invalid username or password' });
 }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
