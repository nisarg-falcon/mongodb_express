const router = require('express').Router()

const UserController = require('../controllers/user.controller')

const { verifyJwtToken } = require('../middlewares/verifyJwtToken')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)
router.post('/get/data', verifyJwtToken, UserController.getUserData)
router.post('/update/data', verifyJwtToken, UserController.updateUserData)
router.post('/logout', verifyJwtToken, UserController.logoutUser)
router.post('/delete', verifyJwtToken, UserController.deleteUser)

module.exports = router