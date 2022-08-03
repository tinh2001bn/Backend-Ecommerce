
const Cart = require('../models/Cart')


const addCart= async (req, res) => {
    const newCart = new Cart(req.body);
  
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
}


const getCart = async( req, res) =>{
      const cart = await Cart.find({});
       res.json(cart);
}


 const updateCart = async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  const deleteCart = async(req, res) =>{
       const cart = await Cart.findById(req.params.id);
       if(addCart){
         await cart.remove();
         res.json({message: "Cart deleted"});
       }
    else{
      throw new Error("Cart not found");
    }
  }

  const getUserCart=  async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  };

module.exports={addCart,getCart,updateCart,deleteCart,getUserCart}