const { User } = require('../models')
const { errorResponse: _Error, successResponse: _Success } = require('../constants/response.constant')
const { createSession, deleteSession } = require('../services/session.service')

const bcrypt = require('bcrypt')

const computeError = (err) => {

    const errors = {}

    if (err.code = 11000) {
        errors['user_name'] = 'Username is already registered'
        return errors
    }

    if (err.message.includes('users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }

    return errors
}

exports.registerUser = async (req, res) => {
    try {
        const { user_name, password, first_name, last_name } = req.body;

        const createUser = { user_name, password, first_name, last_name }

        // const newUser = new User(createUser

        await User.create(createUser)
            .then(data => {
                return res.send(_Success('Registeration Successfully !', data.toJSON()))
            })
            .catch(err => {

                const errors = computeError(err);
                return res.send(_Error(err.message, errors))

            })

    } catch (error) {
        return res.send(_Error(error.message))
    }
}

exports.loginUser = async (req, res) => {
    try {
        if (!(req.body.user_name && req.body.password)) {
            return res.send(_Error('Required Parameters Missing !'))
        }

        const { user_name, password } = req.body

        const getUser = await User.findOne({ user_name }).lean(true)

        if (getUser) {
            if (await bcrypt.compare(password, getUser.password)) {
                const session = await createSession(getUser._id)

                if (session.status) {
                    getUser.token = session.data.token
                    return res.send(_Success('Login Successfull', getUser))
                }
                else {
                    return res.send(_Error(session.message))
                }
            }
            else {
                return res.send(_Error('Invalid Password'))
            }
        }
        else {
            return res.send(_Error('Invalid Username'))
        }

    } catch (error) {
        return res.send(_Error(error.message))
    }
}

exports.getUserData = async (req, res) => {
    if (!(req.body.user_id)) {
        return res.send(_Error('Require Parameters Missing !'))
    }

    const { user_id } = req.body

    const getUser = await User.findById(user_id)

    if (getUser) {
        return res.send(_Success('User data get successfully !', getUser))
    }
    else {
        return res.send(_Error('Account deleted !'))
    }
}

exports.updateUserData = async (req, res) => {
    if (!(req.body.user_id)) {
        return res.send(_Error('Require Parameters Missing !'))
    }

    const { user_id, first_name, last_name } = req.body

    const getUser = await User.findById(user_id)

    if (getUser) {
        await User.updateOne({ user_id }, {
            first_name: first_name ? first_name : getUser.first_name,
            last_name: last_name ? last_name : getUser.last_name
        })
            .then(async data => {

                const responseUser = await User.findById(user_id)

                return res.send(_Success('User data updated !', responseUser))
            })
            .catch(err => {
                return res.send(_Error(err.message))
            })
    }
    else {
        return res.send(_Error('Account deleted !'))
    }
}

exports.deleteUser = async (req, res) => {
    if (!(req.body.user_id)) {
        return res.send(_Error('Require Parameters Missing !'))
    }

    const { user_id } = req.body

    const getUser = await User.findById(user_id)

    if (getUser) {

        const logOutOfAllDevices = await deleteSession(user_id)

        if (logOutOfAllDevices.status) {

            await User.deleteOne({ _id: user_id })
                .then(data => {
                    return res.send(_Success('Account deleted successfull !', data))
                })
                .catch(err => {
                    return res.send(_Error(err.message))
                })

        }
        else {
            return res.send(_Error(logOutOfAllDevices.message))
        }

    }
    else {
        return res.send(_Error('Account deleted !'))
    }
}

exports.logoutUser = async (req, res) => {

    if (!(req.body.user_id)) {
        return res.send(_Error('Require Parameters Missing !'))
    }

    const { user_id, sessionId } = req.body

    const getUser = await User.findById(user_id)

    if (getUser) {
        const session = await deleteSession(user_id, sessionId)
        if (session.status) {
            return res.send(_Success('Logout Successfull', session.data))
        }
        else {
            return res.send(_Error(session.message))
        }
    }
    else {
        return res.send(_Error('Account deleted !'))
    }
}

