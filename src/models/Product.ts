import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  inStock: Boolean,
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;

