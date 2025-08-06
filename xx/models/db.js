const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('connected', () => {
  console.log('✅ Connected to MongoDB')
})

db.on('error', (err) => {
  console.log('❌ MongoDB connection error:', err)
})

module.exports = db