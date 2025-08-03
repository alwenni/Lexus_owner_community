const { JsonWebTokenError } = require('jsonwebtoken');
const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({

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
})

authorSchema.methods.toJSON = function() {
  const author = this.toObject()
  delete author.password
  return author
}


authorSchema.pre('save',async function(next){
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)

  }
  next();
})

authorSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id }, 'secret')
  return token
}




const Author = mongoose.model('Author', authorSchema)

module.exports = Author