// const Item = require('../../models/item')

// const dataController = {}

// // Get all items
// dataController.index = async (req, res, next) => {
//   try {
//     const filter = { isAvailable: true }
//     if (req.query.category) {
//       filter.category = req.query.category
//     }
//     if (req.query.search) {
//       filter.$or = [
//         { title: { $regex: req.query.search, $options: 'i' } },
//         { description: { $regex: req.query.search, $options: 'i' } }
//       ]
//     }
//     res.locals.data.items = await Item.find(filter)
//       .populate('seller', 'name location')
//       .sort({ createdAt: -1 })
//     next()
//   } catch(error) {
//     res.status(400).send({ message: error.message })
//   }
// }

// // Get single item
// dataController.show = async (req, res, next) => {
//   try {
//     res.locals.data.item = await Item.findById(req.params.id)
//       .populate('seller', 'name location phone')
//     if(!res.locals.data.item){
//       throw new Error(`Could not locate an item with the id ${req.params.id}`)
//     }
//     // Increment views
//     res.locals.data.item.views += 1
//     await res.locals.data.item.save()
//     next()
//   } catch (error) {
//     res.status(400).send({ message: error.message })
//   }
// }

// // Create new item
// dataController.create = async (req, res, next) => {
//   try {
//     req.body.seller = req.user._id
//     res.locals.data.item = await Item.create(req.body)
//     req.user.items.addToSet({_id: res.locals.data.item._id })
//     await req.user.save()
//     next()
//   } catch (error) {
//     res.status(400).send({ message: error.message })
//   }
// }

// // Update item
// dataController.update = async (req, res, next) => {
//   try {
//     res.locals.data.item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     next()
//   } catch (error) {
//     res.status(400).send({ message: error.message })
//   }
// }

// // Delete item
// dataController.destroy = async (req, res, next) => {
//   try {
//     await Item.findOneAndDelete({'_id': req.params.id })
//     next()
//   } catch (error) {
//     res.status(400).send({ message: error.message })
//   }
// }

// module.exports = dataController