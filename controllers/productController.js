const products=require('../models/productModel')
const cloudinary=require('cloudinary').v2

exports.addProduct=async(req,res)=>{
   try {
    const {name}=req.body
    const imageFile=req.file

    if(!name || !imageFile){
        return res.json({success:false,message:'input are not filled'})
    }
    const imageUrl=await cloudinary.uploader.upload(imageFile.path)

    const product=new products({
        name,
        image:imageUrl.secure_url,
        date:Date.now()
    })
    await product.save()
    return res.json({success:true,product})
   } catch (error) {
    return res.json({success:false,message:error.message})
   }
}

exports.getProduct=async(req,res)=>{
    try {
        const product=await products.find()        
        return res.json({success:true,product})
    } catch (error) {
        return res.json({success:false,message:error.message}) 
    }
}

exports.removeProduct=async(req,res)=>{
    try{
        const {id}=req.params
        await products.findByIdAndDelete(id)
        return res.json({success:true,message:'product removed'})
        
    } catch (error) {
        return res.json({success:false,message:error.message}) 
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const imageFile = req.file;

        let updateData = { name };

        if (imageFile) {
            const imageUrl = await cloudinary.uploader.upload(imageFile.path);
            updateData.image = imageUrl.secure_url;
        }

        const updatedProduct = await products.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            return res.json({ success: false, message: "Product not found" });
        }

        return res.json({ success: true, message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.searchProduct=async(req,res)=>{
    try {
        const keyword=req.query.search
        const result=await products.find({name:{$regex:keyword,$options:'si'}})
        return res.json({success:true,result})
        
    } catch (error) {
        return res.json({ success: false, message: error.message });

    }
}