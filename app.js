var hbs = require('express-handlebars');
var Handlebars = require('handlebars');
var express = require('express');
var path = require('path');
const expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


var app = express();

app.use(cookieParser()); // Add this after you initialize express.

require('dotenv').config();

// view engine setup
app.use(express.static(path.join(__dirname, "public")));
app.engine('hbs', hbs({extname: 'hbs',
              defaultLayout: 'layout',
              layoutsDir: __dirname + '/views/layouts/',
              partialsDir: __dirname + '/views/partials/',
              handlebars: allowInsecurePrototypeAccess(Handlebars)
              }));
app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'hbs')

require('./data/marketing-db');

bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator());


var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);


require('./controllers/index.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/dashboard.js')(app);






module.exports = app;

port = process.env.PORT;
app.listen(port, () => console.log('Server started on: ' + port))

