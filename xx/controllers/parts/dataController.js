/** 
 seller: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User',
     required: true
   },
   contactInfo: {
         type: String,
         required: true,
     },
   name: {
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
   
   condition: {
     type: String,
     required: true,
     enum: ['New', 'used']
   },
   type: {
     type: String,
     required: true,
     enum: ["original" , "Aftermarket" , "imitative"]
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
 
   
   
   timestamps: true
 })
**/



const Part = requeire('../models/part')
const Comment = require('../models/comments')


const dataController = {}

// Create a new 
dataController.createPart = async (req, res) => {
    try {
        const part = new Part({
            seller: req.user._id,
            contactInfo: req.body.contactInfo,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            condition: req.body.condition,
            type: req.body.type,
            images: req.body.images,
            location: req.body.location,
            year: req.body.year
        })
        await part.save()
        res.status(201).json(part)
    } catch (error) {
        console.error('Error creating part:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// Show a specific part
dataController.showPart = async (req, res) => {
    try {
        const part = await Part.findById(req.params.id).populate('seller', 'name email')
        if (!part) {
            return res.status(404).json({ error: 'Part is not found' })
        }
        res.status(200).json(part)
    } catch (error) {
        console.error('Error fetching part:', error)
        res.status(500).json({ error: 'Internal server error' })
    }}

// Update a specific part
dataController.updatePart = async (req, res) => {
    try {
        const part = await Part.findByIdAndUpdate(req.params.id, {
            contactInfo: req.body.contactInfo,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            condition: req.body.condition,
            type: req.body.type,
            images: req.body.images,
            location: req.body.location,
            year: req.body.year
        }, { new: true, runValidators: true })

        if (!part) {
            return res.status(404).json({ error: 'Part not found' })
        }
        res.status(200).json(part)
    } catch (error) {
        console.error('Error updating part:', error)
        res.status(500).json({ error: 'Internal server error' })
    }

// Delete a specific part
dataController.deletePart = async (req, res) => {
    try {
        const part = await Part.findByIdAndDelete(req.params.id)
        if (!part) {
            return res.status(404).json({ error: 'Part not found' })
        }
        res.status(200).json({ message: 'Part deleted successfully' })
    } catch (error) {
        console.error('Error deleting part:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

// List all parts
dataController.listParts = async (req, res) => {
    try {
        const parts = await Part.find().populate('seller', 'name email')
        res.status(200).json(parts)
    } catch (error) {
        console.error('Error fetching parts:', error)
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
