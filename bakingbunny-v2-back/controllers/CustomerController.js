const bcrypt = require('bcrypt')
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