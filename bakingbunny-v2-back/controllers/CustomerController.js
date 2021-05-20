const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Customer = require('../models/Customer')


exports.signin = async (req, res, next) => {

    const body = request.body

    const user = await Customer.findOne({username: body.username})
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if(!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userToken = {
        username: user.username,
        id: user._id,
    }
    
    const token = jwt.sign(userToken, process.env.SECRET)

    response
        .status(200)
        .send({token, username: user.username, name: user.name})

}


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