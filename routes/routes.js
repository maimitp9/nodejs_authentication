var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../controllers/usersController');
var {db, secret} = require('../config/database')

module.exports = (router, passport) => {
  router.get("/", (req, res) => {
    res.status(200).send("Welcome to my site...")
  })

  router.post("/signup", User.createUser)
  router.post("/login", User.login)

  router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).send({ success: true, user: req.user })
  });
  
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
  })

  router.get("/secretDebug",
    function(req, res, next){
      console.log(req.get('Authorization'));
      next();
    }, function(req, res){
      res.json("debugging");
  });

}