// routes/apiRoutes.js
const express = require('express')
const router = express.Router()

// Controllers
const authorApiController = require('../controllers/auth/apiController')
const userApiController = require('../controllers/auth/apiController')
const postApiController = require('../controllers/posts/apiController')
const postDataController = require('../controllers/posts/dataController')

// Author API Routes
router.post('/authors', authorApiController.createAuthor)
router.post('/authors/login', authorApiController.loginAuthor)
router.get('/authors/profile', authorApiController.auth, authorApiController.getProfile)

// User API Routes
router.post('/users', userApiController.createUser)
router.post('/users/login', userApiController.loginUser)
router.get('/users/profile', userApiController.auth, userApiController.getProfile)
router.put('/users/:id', userApiController.auth, userApiController.updateUser)
router.delete('/users/:id', userApiController.auth, userApiController.deleteUser)

// Post API Routes
router.get('/posts', userApiController.auth, postDataController.index, postApiController.index)
router.get('/posts/:id', userApiController.auth, postDataController.show, postApiController.show)
router.post('/posts', userApiController.auth, postDataController.create, postApiController.create)
router.put('/posts/:id', userApiController.auth, postDataController.update, postApiController.show)
router.delete('/posts/:id', userApiController.auth, postDataController.destroy, postApiController.destroy)

module.exports = router
