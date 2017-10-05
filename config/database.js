var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/authDB';
mongoose.connect(mongoDB, {useMongoClient: true})

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, "error to connect mongo db"));

var secret = "Maimit";
module.exports = {db, secret};