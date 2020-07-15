var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var currentUser = req.user;

  console.log(currentUser)
  res.render('index', { currentUser });
});

module.exports = router;
