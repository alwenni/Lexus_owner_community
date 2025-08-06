const express = require('express')
const router = express.Router()
const partDataController = require('./dataController')
const partViewController = require('./viewController')
const userDataController = require('../auth/dataController')

// Web routes
router.get('/', partDataController.index, partViewController.index)
router.get('/new', userDataController.auth, partViewController.new)
router.post('/', userDataController.auth, partDataController.create, partViewController.show)
router.get('/:id', partDataController.show, partViewController.show)
router.get('/:id/edit', userDataController.auth, partDataController.show, partViewController.edit)
router.put('/:id', userDataController.auth, partDataController.update, partViewController.show)
router.delete('/:id', userDataController.auth, partDataController.destroy)

module.exports = router

