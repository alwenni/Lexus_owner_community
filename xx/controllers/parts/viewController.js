const Part = require("../../models/part")

// Show all items
exports.index = (req, res) => {
  res.render('parts/Index', { Part: res.locals.data.items })
}

// Show single item
exports.show = (req, res) => {
  res.render('parts/Show', { Part: res.locals.data.item })
}

// Show new item form
exports.new = (req, res) => {
  res.render('parts/New')
}

// Show edit item form
exports.edit = (req, res) => {
  res.render('parts/Edit', { Part: res.locals.data.item })
}