const express = require('express')
const router = express.Router()
const ControllerAuth = require('../controllers/auth')

router
    .post('/isActive', ControllerAuth.login)
    .post('/facebook', ControllerAuth.loginFacebook)

module.exports = router