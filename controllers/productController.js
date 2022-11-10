const db = require("../models");

//create model

const Product = db.products;

// 1 create product

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

// 2 get All products

exports.getallproduts = async (req, res) => {
  let products = await Product.findAll({});

  res.status(200).json({ status: true, products: products });
};

// 3 get single product

exports.getsingleprodut = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findOne({ where: { id: id } });

  res.status(200).json({ status: true, product: product });
};

// 4 update product

exports.updateprodut = async (req, res) => {
  let id = req.params.id;

  let product = await Product.update(req.body, { where: { id: id } });

  res.status(200).json({ status: true, product: product });
};

//5 delete product

exports.deleteproduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).json({ status: true, msg: "Product delete successfully" });
};

// 6 get published product

exports.getpublishedproduts = async (req, res) => {
  let products = await Product.findAll({
    where: {
      published: false,
    },
  });

  res
    .status(200)
    .json({ status: true, total: products.length, products: products });
};
