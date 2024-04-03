const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.post('/forgot-password', authController.forgotPassword)
router.patch('/reset-password/:token', authController.resetPassword)

router.use(authController.protect)

router.patch('/update-my-password', authController.updatePassword)

module.exports = router
