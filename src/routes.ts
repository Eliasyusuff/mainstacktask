import express from 'express';
import * as productController from './controllers/productController';
import * as authController from './controllers/authController';
import { authenticate } from './middleware/authenticate';

const router = express.Router();
router.post('/login',  authController.login);
router.post('/sign-up',  authController.signUp);
router.post('/products', authenticate, productController.createProduct);
router.get('/all-products',  authenticate,productController.getAllProducts);
router.get('/single-product/:id', authenticate, productController.getProductById);
router.put('/products/:id', authenticate, productController.updateProduct);
router.delete('/products/:id', authenticate, productController.deleteProduct);

// router.post('/products', authenticate, productController.createProduct);
// router.get('/products', authenticate, productController.getAllProducts);
// router.get('/products/:id', authenticate, productController.getProductById);
// router.put('/products/:id', authenticate, productController.updateProduct);
// router.delete('/products/:id', authenticate, productController.deleteProduct);

export default router;
