"use strict";
// import express from 'express';
// import routes from './routes';
// import mongoose from 'mongoose';
// require('dotenv').config();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const PORT = 3000;
// app.use(express.json()); // for parsing application/json
// const MONGO_URI = 'mongodb://localhost:27017/product_test_db';
// mongoose.connect(MONGO_URI)
//   .then(() => console.log('Successfully connected to MongoDB'))
//   .catch((error) => console.error('Error connecting to MongoDB', error));
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// // After initializing the app
// app.use('/api', routes);
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000; // It's a good practice to make our port configurable
app.use(express_1.default.json()); // for parsing application/json
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/product_test_db';
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB', error));
// Register routes
app.use('/api', routes_1.default);
// Start the server only if we're not in a test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
// Export the Express application
exports.default = app;
