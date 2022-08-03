// require("dotenv").config();
require("dotenv").config();
const Product= require('./models/Product')
const express = require("express");
const connectDB = require("./config/db");
connectDB();
const route =require('./routes')

const app = express();

app.use(express.json());

app.post("/test",  async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});


// app.use("/api/products", productRoutes);
// middle để xử lý dữ liệu ta post từ client đến server
app.use(express.urlencoded({
  extended: true
 }));
 // route init
 route(app);
const PORT =   5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
