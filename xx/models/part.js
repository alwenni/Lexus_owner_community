const mongoose = require('mongoose');

const partSchema = new mongoose.Schema({
  seller:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:     { type: String, required: true, trim: true },     // مثل "كمبروسر GS300 1999"
  description: { type: String, trim: true },
  condition: { type: String, enum: ['new', 'used', 'refurbished'], default: 'used' },
  price:     { type: Number, required: true },
  location:  { type: String, trim: true },
  images:    [{ type: String }],
  compatibleModels: [{ type: String, trim: true }], // GS300 1999, IS250 2010...
  status:    { type: String, enum: ['active', 'sold', 'hidden'], default: 'active' },
}, { timestamps: true });

partSchema.index({ title: 'text', description: 'text', location: 'text', compatibleModels: 'text' });

module.exports = mongoose.model('Part', partSchema);
