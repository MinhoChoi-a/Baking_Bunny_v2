var express = require('express');
var router = express.Router();

const itemControl = require('../controllers/ItemController');

/* GET home page. */
router.get('/', (req, res, next) =>
  res.render('index', { title: 'Express' }));


router.get('/menu/:date', itemControl.getMenu);
//get item info => check selected date and return list of available item list
//post order from cart => add customer/sales info + send email

module.exports = router;