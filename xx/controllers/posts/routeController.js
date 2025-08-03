const express = require('express')
const router = express.Router()
const viewController = require('./viewController')
const dataController = require('./dataController')
const authDataController = require('../auth/dataController')

router.get('/', authDataController.auth, dataController.index, viewController.index)
router.get('/new', authDataController.auth, viewController.newView)
router.delete('/:id', authDataController.auth, dataController.destroy, viewController.redirectHome)
router.put('/:id', authDataController.auth, dataController.update, viewController.redirectShow)
router.post('/', authDataController.auth, dataController.create, viewController.redirectHome)
router.get('/:id/edit', authDataController.auth, dataController.show, viewController.edit)
router.get('/:id', authDataController.auth, dataController.show, viewController.show)

module.exports = router