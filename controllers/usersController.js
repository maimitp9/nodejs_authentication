var User = require('../models/user');
var jwt = require('jsonwebtoken');
var {secret} = require('../config/database');

module.exports.createUser = (req, res) => {
  User.create(req.body , (err, user) => {
    if (err) {
      res.status(400).send({ success: false, message: "User not registered" })
    } else {
      res.status(200).send({ success: false, message: "User registered" })
    }
  })
}


module.exports.login = (req, res) => {
  User.getUserByEmail(req.body.email, (err, user) => {
    if(err) throw err;
    if(!user) {return res.status(400).send({success: false, message: "User not found..."})}
    User.comparePassword(req.body.password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        var token = jwt.sign({ user: user }, secret);
        res.status(200).send({ success: true, token: "JWT "+ token, user:{ id: user._id, email: user.email } })
      }else{
        res.status(400).send({ success: false, message: "Password doesn't match..." })
      }
    })
  })
}
