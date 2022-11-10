const {
  addproduct,
  getallproduts,
} = require("../controllers/productController");
const express = require("express");

const router = express.Router();

router.post("/addproduct", addproduct);
router.get("/getproducts", getallproduts);
module.exports = router;
