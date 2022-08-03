const express = require("express");
const { addOrder, getOrder, getUserOrder, updateOrder, deleteOrder } = require("../controller/OrderController");
const router = express.Router();

router.post('/', addOrder)
router.get('/', getOrder)
router.get('/find/:userId',getUserOrder)
router.put('/:id',updateOrder)
router.delete('/:id',deleteOrder)
module.exports = router;