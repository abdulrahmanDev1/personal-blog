const router = require('express').Router()
const viewsController = require('../controllers/viewsController')
const authController = require('../controllers/authController')

router.use(authController.isLoggedIn)

router.get('/', viewsController.getHomePage)

router.get('/login', viewsController.getLoginForm)

router.get('/profile', authController.protect, viewsController.getProfile)

module.exports = router
