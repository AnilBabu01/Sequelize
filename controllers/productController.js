const db = require("../models");

//create model

const Product = db.products;

//create product

exports.addproduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published,
  };

  const product = await Product.create(info);
  res
    .status(200)
    .json({ status: true, msg: "product add successfully", product: product });
};

//get All products

exports.getallproduts = async (req, res) => {
  let products = await Product.findAll({});

  res.status(200).json({ status: true, products: products });
};
