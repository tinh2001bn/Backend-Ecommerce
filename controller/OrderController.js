const Order = require('../models/Order')


const addOrder= async (req, res) => {
    const newOrder = new Order(req.body);
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
}


const getOrder = async( req, res) =>{
      const order = await Order.find({});
       res.json(order);
}


 const updateOrder = async (req, res) => {
    try {
      const updatedOrder = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  const deleteOrder = async(req, res) =>{
       const order= await Order.findById(req.params.id);
       if(order){
         await order.remove();
         res.json({message: "order deleted"});
       }
    else{
      throw new Error("order not found");
    }
  }
  
  const getUserOrder=  async (req, res) => {
    try {
      const order = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  };

module.exports={addOrder,getOrder,deleteOrder,getUserOrder,updateOrder}