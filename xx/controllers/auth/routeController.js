const express = require('express')
const router = express.Router()
const userDataController = require('./dataController')
const userViewController = require('./viewController')

// Web routes
router.get('/signup', userViewController.signUp)
router.post('/signup', userDataController.createUser, userViewController.signIn)
router.get('/login', userViewController.signIn)
router.post('/login', userDataController.loginUser, userViewController.showProfile)
router.get('/profile', userDataController.auth, userViewController.showProfile)
router.put('/:id', userDataController.auth, userDataController.updateUser)
router.delete('/:id', userDataController.auth, userDataController.deleteUser)

module.exports = router