const Car = require("../../models/car")

// Show all items
exports.index = (req, res) => {
  res.render('cars/Index', { Car: res.locals.data.items })
}

// Show single item
exports.show = (req, res) => {
  res.render('cars/Show', { Car: res.locals.data.item })
}

// Show new item form
exports.new = (req, res) => {
  res.render('cars/New')
}

// Show edit item form
exports.edit = (req, res) => {
  res.render('cars/Edit', { Car: res.locals.data.item })
}