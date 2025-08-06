const mongoose = require('mongoose')

const partSchema = new mongoose.Schema({
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

const Part = mongoose.model('Part', partSchema)
module.exports = Part
