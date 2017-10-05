var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var app = express();

var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');

var {db} = require('./config/database')

var port = process.env.PORT || 3000;

require('./config/passport')(passport)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

var userRouter = require('./routes/routes')(router, passport)
app.use(router);

app.listen(port, () => {
  console.log("server is running on port: " + port)
})