const Product = require('../models/Product')


const addProduct= async (req, res) => {
    const newProduct = new Product(req.body);
  
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
}
const getProduct = async( req, res) =>{
      const product = await Product.find({});
       res.json(product);
}


 const updateProduct = async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  const deleteProduct = async(req, res) =>{
       const product = await Product.findById(req.params.id);
       if(product){
         await product.remove();
         res.json({message: "product deleted"});
       }
    else{
      throw new Error("Product not found");
    }
  }

module.exports={addProduct,getProduct,updateProduct,deleteProduct}