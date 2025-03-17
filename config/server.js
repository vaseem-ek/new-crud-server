const mongoose=require('mongoose')

const connectionString=process.env.MONGODB_URL

mongoose.connect(connectionString).then(res=>{
    console.log('connected MongoDB');
    
}).catch(err=>{
    console.log(err);
    
})