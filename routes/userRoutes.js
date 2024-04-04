const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

router.post('/forgot-password', authController.forgotPassword)
router.patch('/reset-password/:token', authController.resetPassword)

router.use(authController.protect)

router.patch('/update-my-password', authController.updatePassword)

router.get('/', authController.restrictTo('admin'), userController.getAllUsers)
router.get('/:id', userController.getUser)
router.patch(
  '/:id',
  authController.restrictTo('admin'),
  userController.updateUser
)
router.delete(
  '/:id',
  authController.restrictTo('admin'),
  userController.deleteUser
)

router.get('/me', userController.getMe, userController.getUser)
router.patch('/update-me', userController.getMe, userController.updateMe)

module.exports = router
