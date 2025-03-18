const userController=require('../controllers/userController')
const express=require('express')
const upload=require('../middlewares/multer')
const jwtMiddle=require('../middlewares/jwtMiddle')
const productController=require('../controllers/productController')

const router=express.Router()

//user
router.post('/register',upload.single('image'),userController.userRegister)
router.post('/login',userController.userLogin)

//product
router.post('/add-product',jwtMiddle,upload.single('image'),productController.addProduct)
router.get('/get-product',jwtMiddle,productController.getProduct)
router.delete('/remove-product/:id',jwtMiddle,productController.removeProduct)
router.put('/update-product/:id',jwtMiddle,upload.single('image'),productController.updateProduct)
router.get('/search-product',jwtMiddle,productController.searchProduct)


module.exports=router