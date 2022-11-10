const {
  addproduct,
  getallproduts,
  getsingleprodut,
  updateprodut,
  deleteproduct,
  getpublishedproduts,
} = require("../controllers/productController");
const express = require("express");

const router = express.Router();

router.post("/addproduct", addproduct);
router.get("/getproducts", getallproduts);
router.get("/getpublishedproducts", getpublishedproduts);
router.get("/getsingleproducts/:id", getsingleprodut);
router.put("/updateproducts/:id", updateprodut);
router.delete("/deleteproducts/:id", deleteproduct);
module.exports = router;
