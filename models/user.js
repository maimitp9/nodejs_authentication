var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

var User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = (user_id, callback) => {
  console.log("hello I am maimit")
  User.findById(user_id, callback)
}

module.exports.getUserByEmail = (email, callback) => {
  User.findOne({email: email}, callback);
}

module.exports.create = (newUser, callback) => {
  var newUser = new User(newUser);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback)
    })
  })
}

 module.exports.comparePassword = (myPassword, hash, callback) =>{
   bcrypt.compare(myPassword, hash, (err, isMatch) => {
     if(err) throw err;
     callback(null, isMatch);
   })
 }