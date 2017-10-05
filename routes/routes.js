var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

module.exports = (router, passport) => {
  router.get("/", (req, res) => {
    res.status(200).send("Welcome to my site...")
  })

  router.post("/signup", (req, res) => {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    })
    User.createUser(newUser, (err, user) => {
      if(err){
        res.status(400).send({success: false, message: "User not registered"})
      }else{
        res.status(200).send({success: false, message: "User registered"})        
      }
    })
  })
}