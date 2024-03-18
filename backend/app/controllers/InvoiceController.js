const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const dbConfig = require("../config/db.config.js")
const connection = mongoose.createConnection(dbConfig.URL);
const shopModal = require("../models/ShopModel.js");
const Invoice = connection.model("Invoice", shopModal.InvoiceS);

const createInvoice = async (req, res) => {
  try {
    if (!req.body.number || !req.body.customer || !req.body.date || !req.body.invoiceTotal) {
      return res.status(400).send({ message: "Please provide all required fields!" });
    }

    const newInvoice = new Invoice({
      name: req.body.name,
      number: req.body.number,
      customer: req.body.customer,
      date: req.body.date,
      invoiceTotal: req.body.invoiceTotal,
      status: "Created",
      entityKey: "Invoice"
    });

    const data = await newInvoice.save();
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Invoice.",
    });
  }
};

const findAllInvoices = async (req, res) => {
  try {
    const data = await Invoice.find();
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving invoices.",
    });
  }
};

const findInvoiceById = async (req, res) => {
  try {
    const data = await Invoice.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ message: "Invoice not found with id " + req.params.id });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving Invoice with id=" + req.params.id });
  }
};

const updateInvoiceById = async (req, res) => {
  try {
    const data = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      useFindAndModify: false,
      new: true,
    });
    if (!data) {
      return res.status(404).send({
        message: `Invoice not found with id=${req.params.id}.`,
      });
    }
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: "Error updating Invoice with id=" + req.params.id });
  }
};

const deleteInvoiceById = async (req, res) => {
  try {
    const data = await Invoice.findByIdAndRemove(req.params.id);
    if (!data) {
      return res.status(404).send({
        message: `Invoice not found with id=${req.params.id}.`,
      });
    }
    res.send({ message: "Invoice deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: "Could not delete Invoice with id=" + req.params.id });
  }
};

const deleteAllInvoices = async (req, res) => {
  try {
    const data = await Invoice.deleteMany({});
    res.send({
      message: `${data.deletedCount} invoices were deleted successfully!`,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all invoices.",
    });
  }
};

router.post("/", createInvoice);
router.get("/", findAllInvoices);
router.get("/:id", findInvoiceById);
router.put("/:id", updateInvoiceById);
router.delete("/:id", deleteInvoiceById);
router.delete("/", deleteAllInvoices);

module.exports = router;
