const jwt = require('jsonwebtoken')

const getTokenFrom = request => {

    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startWith('bearer ')) {
        return authorization.substring(7)
    }

    return null
}

exports.order = async (req, res, next) => {

    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.id) {

        return res.status(401).json({error: 'token missing or invalid'})

    }

    next();
}
