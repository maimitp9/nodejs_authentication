var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var User = require('../controllers/usersController');

module.exports = (router, passport) => {
  router.get("/", (req, res) => {
    res.status(200).send("Welcome to my site...")
  })

  router.post("/signup", User.createUser)
  router.post("/login", User.login)
  router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).send({ success: true, user: user.req })
  });

}