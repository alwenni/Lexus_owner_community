const Car = require('../../models/car')
const Comment = require('../../models/comments')

// Create a new 
exports.createCar = async (req, res, next) => {
    try {
        const car = new Car({
            seller: req.user._id,
            model: req.body.model,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition,
            images: req.body.images,
            location: req.body.location,
            year: req.body.year,
            distance: req.body.distance,
            contactInfo: req.body.contactInfo
        })
        await car.save()
        res.locals.data.car = car
        next()
    } catch (error) {
        console.error('Error creating car:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// Show a specific car
exports.showCar = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id).populate('seller', 'name email')
        if (!car) {
            return res.status(404).json({ error: 'Car is not found' })
        }
        res.locals.data.car = car
        next()
    } catch (error) {
        console.error('Error fetching car:', error)
        res.status(500).json({ error: 'Internal server error' })
    }}

// Update a specific car
exports.updateCar = async (req, res, next) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, {
            model: req.body.model,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            condition: req.body.condition,
            images: req.body.images,
            location: req.body.location,
            year: req.body.year,
            distance: req.body.distance,
            contactInfo: req.body.contactInfo
        }, { new: true, runValidators: true })
        
        if (!car) {
            return res.status(404).json({ error: 'Car not found' })
        }
         res.locals.data.car = car
        next()
    } catch (error) {
        console.error('Error updating car:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
  }
// Delete a specific car
exports.deleteCar = async (req, res, next) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id)
        if (!car) {
            return res.status(404).json({ error: 'Car not found' })
        }
         res.locals.data.car = car
        next()
    } catch (error) {
        console.error('Error deleting car:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// List all cars
exports.listCars = async (req, res, next) => {
    try {
        const cars = await Car.find().populate('seller', 'name email')
        res.locals.data.cars = cars
        next()
    } catch (error) {
        console.error('Error fetching cars:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// comment on a car

// /:id/comment post
exports.createComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      author: req.user._id,
      listing: req.params.id
    })
    await comment.save()
    const car = await Car.findById(req.params.id)
    car.comments.addToSet(comment._id)  // Add comment to car's comments array      
    await car.save()
    res.locals.data.comment = comment
    res.locals.data.car = car
    next()
  } catch (error) {
    console.error('Error creating comment:', error)
    res.status(500).json({ error: 'Internal server error' })
    }
} 
