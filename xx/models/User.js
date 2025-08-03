const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password: {
        type: String,
        required: true,
        minlength: 6

    },
    bio:{
        type: String,
        default: "Hello, I'm new in lexus website!"
    },
    location:{
        type: String,
        default: "Bahrain, Manama"
    }
});

module.exports = mongoose.model('User', userSchema);