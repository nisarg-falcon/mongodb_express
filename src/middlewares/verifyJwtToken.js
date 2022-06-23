const { Session } = require('../models')
const { errorResponse: _Error, successResponse: _Success } = require('../constants/response.constant')
const { jwt_secret_key } = require('../constants/general.constant')

const jwt = require('jsonwebtoken')

exports.verifyJwtToken = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]
        if (token) {
            jwt.verify(token, jwt_secret_key, async (err, decode) => {
                if (err) {
                    return res.send(_Error(err.message, err))
                }
                if (decode.id == req.body.user_id) {
                    const checkUserLoggedIn = await Session.findOne({ user_id: req.body.user_id, token })
                    if (checkUserLoggedIn) {
                        req.body.sessionId = checkUserLoggedIn._id
                        next()
                    }
                    else {
                        return res.send(_Error('Account logout by user !'))
                    }
                }
                else {
                    return res.send(_Error('Invalid Access !'))
                }
            })
        }
        else {
            return res.send(_Error('Invalid Jwt Token Passed !'))
        }
    }
    else {
        return res.send(_Error('JWT Token Missing !'))
    }
}