const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    image:{type:String}
})

const users=mongoose.model('users',userSchema)
module.exports=users