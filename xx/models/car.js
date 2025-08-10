const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  seller:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  make:      { type: String, required: true, trim: true },   // Lexus
  model:     { type: String, required: true, trim: true },   // GS 300, IS 350 ...
  year:      { type: Number, required: true },
  price:     { type: Number, required: true },
  mileage:   { type: Number },
  location:  { type: String, trim: true },
  images:    [{ type: String }], // URLs
  description: { type: String, trim: true },
  features:  [{ type: String }],
  status:    { type: String, enum: ['active', 'sold', 'hidden'], default: 'active' },
}, { timestamps: true });

// نصي للبحث
carSchema.index({ make: 'text', model: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Car', carSchema);
