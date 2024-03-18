const express = require("express");
const { MongoClient } = require("mongodb");
const axios = require("axios");
const cors = require("cors");
const dbConfig = require("../backend/app/config/db.config.js");
const corsOptions = { origin: dbConfig.CORS, credentials: true };
const app = express();
const client = new MongoClient("mongodb+srv://njoco:OZCYn16yxbOtjQ2x@cluster0.dkvowsi.mongodb.net/");
const productApi = require("./app/controllers/ProductsController.js");
const customerApi = require("./app/controllers/CustomerController.js");
const invoiceApi = require("./app/controllers/InvoiceController.js");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productApi);
app.use("/api/customers", customerApi);
app.use("/api/invoices", invoiceApi);
app.listen(8080, () => {
  console.log(`Server is running on port ${8080}.`);
});

async function run() {
  try {
    // Stelle die Verbindung zur MongoDB her
    await client.connect();

    console.log("Successfully connected to Atlas");

    // Beispielprodukt für das Einfügen in die Datenbank
    const product = {
      name: "John",
      unitPrice: 1000,
    };

    // Produkt erstellen
    const createdProduct = await axios.post(
      "http://localhost:8080/api/products/",
      product
    );
    const sampleProduct = createdProduct.data; // Use the returned product object
    console.log("Product created:", sampleProduct);

    // Beispielkunde für das Einfügen in die Datenbank
    const customer = {
      name: "Jane Doe",
    };
    const createdCustomer = await axios.post(
      "http://localhost:8080/api/customers/",
      customer
    );
    const sampleCustomer = createdCustomer.data; // Use the returned customer object
    console.log("Customer created:", sampleCustomer);

    // Beispielrechnung für das Einfügen in die Datenbank
    const invoice = {
      number: 12345,
      customer: sampleCustomer._id, // Use the customer ID from the created customer
      date: new Date(),
      invoiceTotal: 500,
    };

    // Rechnung erstellen
    const createdInvoice = await axios.post(
      "http://localhost:8080/api/invoices/",
      invoice
    );

    const sampleInvoice = createdInvoice.data; // Use the returned invoice object
    console.log("Invoice created:", sampleInvoice);

    // Alle Produkte abrufen
    const allProducts = await axios.get("http://localhost:8080/api/products/");
    console.log("Got All Products:", allProducts.data.length);

    // Alle Kunden abrufen
    const allCustomers = await axios.get(
      "http://localhost:8080/api/customers/"
    );
    console.log("Got All Customers:", allCustomers.data.length);

    // Alle Rechnungen abrufen
    const allInvoices = await axios.get("http://localhost:8080/api/invoices/");
    console.log("Got All Invoices:", allInvoices.data.length);

    // Produkt löschen
    await axios.delete("http://localhost:8080/api/products/", {
      data: { id: sampleProduct._id },
    });

    // Kunde löschen
    await axios.delete("http://localhost:8080/api/customers/", {
      data: { id: sampleCustomer._id },
    });

    // Rechnung löschen
    await axios.delete("http://localhost:8080/api/invoices/", {
      data: { id: sampleInvoice._id },
    });

    console.log("Deleted product");
    console.log("Deleted customer");
    console.log("Deleted invoice");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
