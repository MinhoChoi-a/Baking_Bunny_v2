const jwt = require('jsonwebtoken')
const Customer = require('../models/Customer')

exports.getMenu = (req, res, next) => {

    const dt = req.params.date;

    //ES6 Sample code
    const notes = [];
    const generateId = () => {
        const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id)) // ...syntax + map method
        : 0

        return maxId + 1;
    }

    const note = {
        important: body.important || false //if the data saved in the body variable has the important property
    }
    
};

const getTokenFrom = request => {

    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startWith('bearer ')) {
        return authorization.substring(7)
    }

    return null

}

//using jwt
exports.addItem = async (req, res, next) => {

    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.id) {

        return res.status(401).json({error: 'token missing or invalid'})

    }

    //any code of method for authorized user
    const user = await Customer.findById(decodedToken.id)
    
    res.json('something')
}