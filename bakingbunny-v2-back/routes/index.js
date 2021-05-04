var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//get item info => check selected date and return list of available item list
//post order from cart => add customer/sales info + send email

