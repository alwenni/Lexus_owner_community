const { token } = require("morgan")
const Car = require("../../models/car")

// Show all items
exports.index = (req, res) => {
  res.render('items/Index', { cars: res.locals.data.cars, token: res.locals.data.token })
}

// Show single item
exports.show = (req, res) => {
  res.render('items/ShowCar', { car: res.locals.data.car, token: res.locals.data.token })
}

// Show new item form
exports.new = (req, res) => {
  res.render('items/NewCar', { token: res.locals.data.token, car: res.locals.data.car })
}

// Show edit item form
exports.edit = (req, res) => {
  res.render('items/EditCar', { token: res.locals.data.token, car: res.locals.data.car })
}