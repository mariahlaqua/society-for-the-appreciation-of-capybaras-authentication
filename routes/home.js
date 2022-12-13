/// routing requests to relevant controllers

const { application } = require('express');
const express = require('express');
const router = express.Router();
const getController = require('../controllers/get')
const authController = require('../controllers/authPost')

router.get('/', getController.getIndex)
router.get('/login', getController.getLogin)
router.get('/signup', getController.getSignUp)
router.post('/login', authController.login)
router.post('/signup', authController.signup)


module.exports = router;