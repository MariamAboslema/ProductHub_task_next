//get + post
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req,res) {
    await dbConnect();
    if(req.method === 'GET'){
        try {
      const products = await Product.find({});
      return res.status(200).json({ success: true, products});
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    }
    else if (req.method === 'POST') {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json({ success: true, product });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  } 
  else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}