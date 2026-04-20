import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  discountPercentage: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  brand: String,
  category: String,
  thumbnail: String,
  images: [{ type: String }],
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;