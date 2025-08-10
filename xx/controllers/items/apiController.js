// // API Item controllers - returns JSON responses
// const apiController = {
//   // Get all items
//   index(req, res) {
//     res.json(res.locals.data.items)
//   },

//   // Get single item
//   show(req, res) {
//     res.json(res.locals.data.item)
//   },

//   // Create new item
//   create(req, res) {
//     res.status(201).json(res.locals.data.item)
//   },

//   // Update item
//   update(req, res) {
//     res.json(res.locals.data.item)
//   },

//   // Delete item
//   destroy(req, res) {
//     res.status(200).json({ message: 'Item successfully deleted' })
//   }
// }

// module.exports = apiController