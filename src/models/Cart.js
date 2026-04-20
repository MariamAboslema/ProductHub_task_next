import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { type: Number, required: true, min: 1 }
});

const CartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  totalPrice: { type: Number, default: 0 }
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);

export default Cart;