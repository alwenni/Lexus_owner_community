const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
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

const Car = mongoose.model('Car', carSchema)
module.exports = Car
