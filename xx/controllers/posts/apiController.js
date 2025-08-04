const Car = require('../../models/Car.js')

// API Car controllers - returns JSON responses
const apiController = {
  // Get all cars for authenticated user
  index(req, res) {
    res.json(res.locals.data.cars)
  },

  // Get single car
  show(req, res) {
    res.json(res.locals.data.car)
  },

  // Create new car
  create(req, res) {
    res.status(201).json(res.locals.data.car)
  },

  // Delete car
  destroy(req, res) {
    res.status(200).json({ message: 'Car successfully deleted' })
  }
}

module.exports = apiController 