import ProductModel from "../models/productModel.js";

//@desc Fetch all products
//@route GET /api/products
//@access public

export const allProducts = async(req, res) => {
  try {
    
    const allProducts = await ProductModel.find({});
    if (allProducts){
      return res.json(allProducts)
    } else {
      res.status(404).json({message: 'Products not found'})
    }

  } catch (error) {
    res.status(400).json({
      message: 'could not find products',
      errorM: process.env.NODE_ENV === 'development'? error : null
    })
  }
}

export const singleProduct = async(req, res) =>{
  try {
    const product = await ProductModel.findById(req.params.id);

    if (product){
      res.json(product)
    } else {
      res.status(400).json({message: 'product not found1'})
    }
    
    
  } catch (error) {
    res.status(404).json({
      message: 'product not found2',
      errorM : process.env.NODE_ENV==='production'? null : error
    })
  }
}