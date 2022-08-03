const express = require("express");
const router = express.Router();
const { addProduct,getProduct,updateProduct , deleteProduct} = require("../controller/productController");

router.post('/', addProduct)
router.get('/', getProduct)
router.put('/:id',updateProduct)
router.delete('/:id',deleteProduct)
module.exports = router;