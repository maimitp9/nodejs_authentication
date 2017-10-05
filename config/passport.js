var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user')
var {secret} = require('./database')

module.exports = (passport) => {
  
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secret;
  // opts.issuer = 'accounts.examplesoft.com';
  // opts.audience = 'yoursite.net';

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      console.log(jwt_payload._doc)
    User.getUserById(jwt_payload._doc._id, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account 
        }
    });
  }));
}