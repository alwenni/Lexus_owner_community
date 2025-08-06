const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Car = require('./car') // Assuming Car model is in the same directory

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }]
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
})

// Hide password from JSON responses
userSchema.methods.toJSON = function() {
  const user = this.toObject()
  delete user.password
  return user
}

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

// Generate JWT token
userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
  return token
}

const User = mongoose.model('User', userSchema)
module.exports = User