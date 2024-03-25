"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const createProduct = async (req, res) => {
    try {
        const product = new Product_1.default(req.body);
        await product.save();
        res.status(201).send(product);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.createProduct = createProduct;
const getAllProducts = async (req, res) => {
    try {
        console.log("i got here");
        const products = await Product_1.default.find(); // Fetch all products from the database
        res.status(200).send(products);
    }
    catch (error) {
        res.status(500).send({ message: 'Error getting the products', error });
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    try {
        const product = await Product_1.default.findById(req.params.id); // Fetch product by ID from the database
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send(product);
    }
    catch (error) {
        res.status(500).send({ message: 'Error getting the product', error });
    }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update the product and return the updated document
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send(product);
    }
    catch (error) {
        res.status(500).send({ message: 'Error updating the product', error });
    }
};
exports.updateProduct = updateProduct;
// In productController.ts
const deleteProduct = async (req, res) => {
    try {
        const product = await Product_1.default.findByIdAndDelete(req.params.id); // Delete the product from the database
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send({ message: 'Product successfully deleted' });
    }
    catch (error) {
        res.status(500).send({ message: 'Error deleting the product', error });
    }
};
exports.deleteProduct = deleteProduct;
