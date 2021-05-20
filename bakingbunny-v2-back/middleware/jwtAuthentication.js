const jwt = require('jsonwebtoken')

const getTokenFrom = request => {

    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startWith('bearer ')) {
        return authorization.substring(7)
    }

    return null
}

exports.checkToken = (role) => async (req, res, next) => {

    const body = req.body
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(!token || !decodedToken.id) {

        return res.status(401).json({error: 'token missing or invalid'})
    }

    //+check role(decodedToken.role)

    const user = await Customer.findById(decodedToken.id)

    if(!user) {

        return res.status(401).json({error: 'invalid token'})
    }

    next();
}


/*
other solution: server side session

The shorter the expiration time, the more safe the solution is. So if the token gets into wrong hands, or the user access to the system needs to be revoken, token is usable only a limited amount of time. On the other hand, a short expiration time forces is a potential pain to a user, one must login to the system more frequently.

The other solution is to save info about each token to backend database and to check for each API request if the access right corresponding to the token is still valid. With this scheme, the access rights can be revoked at any time. This kind of solution is often called a server side session.

The negative aspect of server side sessions is the increased complexity in the backend and also the effect on performance since the token validity needs to be checked for each API request from database. A database access is considerably slower compared to checking the validity from the token itself. That is why it is a quite common to save the session corresponding to a token to a key-value-database such as Redis that is limited in functionality compared to eg. MongoDB or relational database but extremely fast in some usage scenarios.

When server side sessions are used, the token is quite often just a random string, that does not include any information about the user as it is quite often the case when jwt-tokens are used. For each API request the server fetches the relevant information about the identitity of the user from the database. It is also quite usual that instead of using Authorization-header, cookies are used as the mechanism for transferring the token between the client and the server.

*/