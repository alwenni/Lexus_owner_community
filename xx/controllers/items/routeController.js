const express = require('express')
const router = express.Router()
const itemDataController = require('./dataController')
const itemViewController = require('./viewController')
const userDataController = require('../auth/dataController')

// Web routes
router.get('/', itemDataController.index, itemViewController.index)
router.get('/new', userDataController.auth, itemViewController.new)
router.post('/', userDataController.auth, itemDataController.create, itemViewController.show)
router.get('/:id', itemDataController.show, itemViewController.show)
router.get('/:id/edit', userDataController.auth, itemDataController.show, itemViewController.edit)
router.put('/:id', userDataController.auth, itemDataController.update, itemViewController.show)
router.delete('/:id', userDataController.auth, itemDataController.destroy)

module.exports = router