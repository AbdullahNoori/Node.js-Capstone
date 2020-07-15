var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res) {
  var currentUser = req.user;

  console.log(currentUser)
  res.render('index', { currentUser });
});

module.exports = router;
