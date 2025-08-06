const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({

    content: {
        type: String,        // The actual comment text
        required: true,      // Comments must have content
        trim: true          // Remove extra whitespace
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to User who wrote it
        ref: 'User',        // Links to User collection
        required: true      // Every comment must have an author
    },
    listing:{
        type: mongoose.Schema.Types.ObjectId,  // Reference to the listing (car or part)
        ref: 'Car',     // Links to Car collection
        required: true      // Every comment must be associated with a listing
    },
    createdAt: {
        type: Date,         // Timestamp for when the comment was created
        default: Date.now   // Automatically set to current date/time
    }
}, {
    timestamps: true      // Automatically manage createdAt and updatedAt fields
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment