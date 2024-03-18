const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dbConfig = require("../config/db.config.js")
const connection = mongoose.createConnection(dbConfig.URL);
const shopModal = require("../models/ShopModel.js");
const Customer = connection.model("Customer", shopModal.CustomerS);
console.log("sadfas")
const createCustomer = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: "Name cannot be empty!" });
    }
    console.log("customercontroller",req.body.name)

    const newCustomer = new Customer({
      name: req.body.name,
      status: req.body.status,
      entityKey: req.body.entityKey
    });

    const data = await newCustomer.save();
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Customer.",
    });
  }
};

const findAllCustomers = async (req, res) => {
  try {
    const data = await Customer.find();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving customers.",
    });
  }
};

const findCustomerById = async (req, res) => {
  try {
    const data = await Customer.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ message: "Customer not found with id " + req.params.id });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Customer with id=" + req.params.id });
  }
};

const updateCustomerById = async (req, res) => {
  try {
    const data = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      useFindAndModify: false,
      new: true,
    });
    if (!data) {
      return res.status(404).send({
        message: `Customer not found with id=${req.params.id}.`,
      });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error updating Customer with id=" + req.params.id });
  }
};

const deleteCustomerById = async (req, res) => {
  try {
    const data = await Customer.findByIdAndRemove(req.params.id);
    if (!data) {
      return res.status(404).send({
        message: `Customer not found with id=${req.params.id}.`,
      });
    }
    res.send({ message: "Customer deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Could not delete Customer with id=" + req.params.id });
  }
};

const deleteAllCustomers = async (req, res) => {
  try {
    const data = await Customer.deleteMany({});
    res.send({
      message: `${data.deletedCount} customers were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all customers.",
    });
  }
};

router.post("/", createCustomer);
router.get("/", findAllCustomers);
router.get("/:id", findCustomerById);
router.put("/:id", updateCustomerById);
router.delete("/:id", deleteCustomerById);
router.delete("/", deleteAllCustomers);

module.exports = router;
