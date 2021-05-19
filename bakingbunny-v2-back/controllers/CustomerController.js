const bcrypt = require('bcrypt')
const { response } = require('../app')
const Customer = require('../models/Customer')


exports.signon = async (req, res, next) => {

    const body = req.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const customer = new Customer({

        username: body.username,
        name: body.name,
        passwordHash

    })

    const savedCustomer = await customer.save()

}

exports.getAllUser = async (req, res, next) => {

    const users = await Customer
        .find({})
        //.populate('field_name', {chosing codition e.g oneField: value}): we can replace data with the referenced document
    
    res.json(users)

}