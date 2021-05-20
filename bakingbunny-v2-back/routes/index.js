var express = require('express')
var router = express.Router()

const itemControl = require('../controllers/ItemController')
const customerControl = require('../controllers/CustomerController')

const jwtModule = require('../middleware/jwtAuthentication')

/* GET home page. */
router.get('/', (req, res, next) =>
  res.render('index', { title: 'Express' }))

router.get('/menu/:date', jwtModule.checkToken('manager'), itemControl.getMenu)
//get item info => check selected date and return list of available item list
//post order from cart => add customer/sales info + send email

router.post('/user', customerControl.signon)
router.get('/user', customerControl.getAllUser)

module.exports = router;