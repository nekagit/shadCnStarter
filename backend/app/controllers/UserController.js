const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ProductSchema = require("../models/ShopModel.js");
const dbConfig = require("../config/db.config.js")
const connection = mongoose.createConnection(dbConfig.URL);
const Product = connection.model("Product", ProductSchema);


const createProduct = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: "Name can not be empty!" });
    }
    const Product = new Product({
      name: req.body.name,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      sports: req.body.sports,
    });
    const data = await Product.save();
    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
  }
};

// Route handler for retrieving all Prijave
const findAllPrijave = async (req, res) => {
  try {
    const data = await Product.find();
    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({
        message: err.message || "Some error occurred while retrieving prijave.",
      });
  }
};

// Route handler for retrieving a single Product by id
const findProductById = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .send({ message: "Not found Product with id " + req.params.id });
    }
    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error retrieving Product with id=" + req.params.id });
  }
};

// Route handler for updating a Product by id
const updateProductById = async (req, res) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      return res
        .status(404)
        .send({
          message: `Cannot update Product with id=${req.params.id}. Maybe Product was not found!`,
        });
    }
    res.send({ message: "Product was updated successfully." });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error updating Product with id=" + req.params.id });
  }
};

// Route handler for deleting a Product by id
const deleteProductById = async (req, res) => {
  try {
    const data = await Product.findByIdAndRemove(req.params.id);
    if (!data) {
      return res
        .status(404)
        .send({
          message: `Cannot delete Product with id=${req.params.id}. Maybe Product was not found!`,
        });
    }
    res.send({ message: "Product was deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Could not delete Product with id=" + req.params.id });
  }
};

// Route handler for deleting all Prijave
const deleteAllPrijave = async (req, res) => {
  try {
    const data = await Product.deleteMany({});
    res.send({
      message: `${data.deletedCount} Prijave were deleted successfully!`,
    });
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message || "Some error occurred while removing all prijave.",
      });
  }
};

// Route handler for finding all published Prijave
const findAllPublishedPrijave = async (req, res) => {
  try {
    const data = await Product.find({ published: true });
    res.send(data);
  } catch (err) {
    res
      .status(500)
      .send({
        message:
          err.message ||
          "Some error occurred while retrieving published prijave.",
      });
  }
};

// Define the routes
router.post("/", createProduct);
router.get("/", findAllPrijave);
router.get("/:id", findProductById);
router.put("/:id", updateProductById);
router.delete("/:id", deleteProductById);
router.delete("/", deleteAllPrijave);
router.get("/published", findAllPublishedPrijave);

module.exports = router;
