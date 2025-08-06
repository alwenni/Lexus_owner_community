/*
seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  model: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Sedan', 'Coupe', 'SUV', 'Truck', 'Van', 'Other']
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'used']
  },
  images: [{
    type: String,
    trim: true
  }],
  location: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1886, // The year the first car was invented
    max: new Date().getFullYear() + 1 // Allow up to next year
  },

  distance: {
    type: Number,
    required: true,
    min: 0 // Distance in kilometers or miles
  },
  contactInfo: {
        type: String,
        required: true,
    },
  
  timestamps: true
})
*/
const Car = requeire('../models/car')
const Comment = require('../models/comments')


const dataController = {}

// Create a new 
dataController.createCar = async (req, res) => {
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
        res.status(201).json(car)
    } catch (error) {
        console.error('Error creating car:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// Show a specific car
dataController.showCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id).populate('seller', 'name email')
        if (!car) {
            return res.status(404).json({ error: 'Car is not found' })
        }
        res.status(200).json(car)
    } catch (error) {
        console.error('Error fetching car:', error)
        res.status(500).json({ error: 'Internal server error' })
    }}

// Update a specific car
dataController.updateCar = async (req, res) => {
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
        res.status(200).json(car)
    } catch (error) {
        console.error('Error updating car:', error)
        res.status(500).json({ error: 'Internal server error' })
    }

// Delete a specific car
dataController.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id)
        if (!car) {
            return res.status(404).json({ error: 'Car not found' })
        }
        res.status(200).json({ message: 'Car deleted successfully' })
    } catch (error) {
        console.error('Error deleting car:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// List all cars
dataController.listCars = async (req, res) => {
    try {
        const cars = await Car.find().populate('seller', 'name email')
        res.status(200).json(cars)
    } catch (error) {
        console.error('Error fetching cars:', error)
        res.status(500).json({ error: 'Internal server error' })
    }}

// comment on a car

// /:id/comment post
dataController.createComment = async (req, res) => {
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
    next()
  } catch (error) {
    console.error('Error creating comment:', error)
    res.status(500).json({ error: 'Internal server error' })
    }
    }}

    module.exports = dataController
