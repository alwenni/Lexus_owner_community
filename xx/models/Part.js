const mongoose=require('mongoose')


const partSchema=new mongoose.Schema({
name:{type: String, required: true},
model: {type: Number, required: true},
price: {type: Number, required:true},
condition:{type: String, required:true},
contact: {type: String || Number,required:true},
part_number: {type:String &&Number, required:true}
})



const Part=mongoose.model('Part',partSchema)
module.exports=Part