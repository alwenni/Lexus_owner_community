const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Polymorphic reference: Car or Part
  onModel:  { type: String, required: true, enum: ['Car', 'Part'] },
  on:       { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'onModel' },
  body:     { type: String, required: true, trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
