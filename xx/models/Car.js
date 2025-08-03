const mongoose=require('mongoose')


const carSchema=new mongoose.Schema({
name:{type: String, required: true},
color: {type: String, required: true},
model: {type: Number, required: true},
price: {type: Number, required:true},
condition:{type: String, required:true},
contact: {type: String || Number,required:true},
distance: {type: Number,required: true},
accidents: {type: Number,required: true},
specifications: {type: String, required: true},
})



const Cars=mongoose.model('Car',carSchema)
module.exports=Car