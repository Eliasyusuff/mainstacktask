import { Request, Response } from 'express';
import Product from '../models/Product';


export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};


export const getAllProducts = async (req: Request, res: Response) => {
    try {
        console.log("i got here");
        const products = await Product.find(); // Fetch all products from the database
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send({ message: 'Error getting the products', error });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id); // Fetch product by ID from the database
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ message: 'Error getting the product', error });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update the product and return the updated document
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ message: 'Error updating the product', error });
    }
};
// In productController.ts

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id); // Delete the product from the database
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send({ message: 'Product successfully deleted' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting the product', error });
    }
};
