// src/pages/api/products/[ID].js
import connectDB from '../../../lib/mongodb';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.status(200).json({ success: true, product });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } 

 else if (req.method === 'PUT' || req.method === 'PATCH') {
  try {
    // هنا بنستخدم $set عشان يغير الحقول اللي بعثناها فقط
    const product = await Product.findByIdAndUpdate(
      id, 
      { $set: req.body },          // ← التعديل المهم هنا
      { 
        returnDocument: 'after', 
        runValidators: true 
      }
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Update Error:", error);
    return res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
} 

  else if (req.method === 'DELETE') {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      return res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } 

  else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}