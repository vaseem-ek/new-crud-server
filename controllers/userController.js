const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2
const jwt=require('jsonwebtoken')

//registration

exports.userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const imageFile = req.file
        
        if (!name || !email || !password ) {
            return res.json({ success: false, message: "missing details" })
        }
        const existing = await users.findOne({ email })
        if (existing) {
            return res.json({ success: false, message: "user already registered" })
        }

        const imageUrl = await cloudinary.uploader.upload(imageFile.path)

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new users({
            name,
            email,
            password: hashedPassword,
            image: imageUrl.secure_url
        })

        await user.save()
        return res.json({ success: true, user })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

//user login
exports.userLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        const existing=await users.findOne({email})
        if(!existing){
            return res.json({success:false,message:'user not registered'})
        }
        const decodePassword=await bcrypt.compare(password,existing.password)
        if(!decodePassword){
            return res.json({success:false,message:"password is incorrect"})
        }
        const token=await jwt.sign({userId:existing._id},process.env.SECRET_KEY)

        return res.json({success:true,user:existing,token})
        
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}