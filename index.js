const express=require('express')
const cors=require('cors')
require('dotenv').config()
require('./config/server')
const connectCloudinary=require('./config/cloudinary')
const userRoute=require('./route/userRoute')


connectCloudinary()

const app=express()

app.use(express.json())
app.use(cors())

//routes
app.use(userRoute)

const PORT=3000 || process.env.PORT

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(PORT,()=>{
    console.log('server running at:',PORT);
})