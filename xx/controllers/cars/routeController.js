const express = require('express')
const router = express.Router()
const carDataController = require('./controller')
const carViewController = require('./viewController')
const userDataController = require('../auth/dataController')

// Web routes
router.get('/', carDataController.listCars, carViewController.index)
router.get('/new', userDataController.auth, carViewController.new)
router.post('/', userDataController.auth, carDataController.createCar, carViewController.show)
router.get('/:id', carDataController.showCar, carViewController.show)
router.get('/:id/edit', userDataController.auth, carDataController.showCar, carViewController.edit)
router.put('/:id', userDataController.auth, carDataController.updateCar, carViewController.show)
router.delete('/:id', userDataController.auth, carDataController.deleteCar, carViewController.show)

module.exports = router

