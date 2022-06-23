const { Session } = require('../models')
const { jwt_secret_key } = require('../constants/general.constant')

const jwt = require('jsonwebtoken')

exports.createSession = async (user_id) => {

    const returnResponse = {
        status: false,
        message: '',
        data: {}
    }

    const token = jwt.sign({ id: user_id }, jwt_secret_key, { expiresIn: '30m' })

    const createSession = {
        token,
        user_id
    }

    const newSession = new Session(createSession)

    await newSession.save()
        .then(data => {
            returnResponse.status = true
            returnResponse.data = data.toJSON()
        })
        .catch(err => {
            returnResponse.message = err.message
            return returnResponse
        })

    return returnResponse

}

exports.deleteSession = async (user_id, session_id = '') => {

    const returnResponse = {
        status: false,
        message: '',
        data: {}
    }

    const deleteSessionObj = {
        user_id
    }

    if (session_id != '') {
        deleteSessionObj._id = session_id
    }

    await Session.deleteOne(deleteSessionObj)
        .then(data => {
            returnResponse.status = true
            returnResponse.data = data.toJSON()
        })
        .catch(err => {
            returnResponse.message = err.message
            return returnResponse
        })

    return returnResponse
}