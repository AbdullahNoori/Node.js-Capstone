var hbs = require('express-handlebars');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const expressValidator = require('express-validator');


var app = express();

require('dotenv').config();



bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var indexRouter = require('./routes/index');



var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  var token = req.body.token || req.body.query || req.headers['x-access-token'];

  if (typeof token === "undefined" || token === null) {
    req.user = null;
  } else {
    var token = token;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);


// view engine setup
app.engine('hbs', hbs({extname: 'hbs',
              defaultLayout: 'layout',
              layoutsDir: __dirname + '/views/layouts/',
              partialsDir: __dirname + '/views/partials/',
              }));
app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, "public")));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

require('./data/marketing-db');
require('./routes/auth.js')(app);

// routes 
app.use('/', indexRouter);



port = process.env.PORT || 3000;
app.listen(port);
console.log('Server started on: ' + port);

module.exports = app;
