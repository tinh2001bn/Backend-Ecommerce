const express = require("express");
const { addCart, getCart, updateCart, deleteCart ,getUserCart} = require("../controller/cartController");
const router = express.Router();

router.post('/', addCart)
router.get('/', getCart)
router.get('/find/:userId',getUserCart)
router.put('/:id',updateCart)
router.delete('/:id',deleteCart)
module.exports = router;