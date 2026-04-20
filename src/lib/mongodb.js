import mongoose from "mongoose";
const MONGODB_URL = process.env.MONGODB_URL;

if(!MONGODB_URL){
    throw new Error('Invalid url');
}

let isConnected = false;
async function dbConnect(){
    if (isConnected) return;
    try{
        const db = await mongoose.connect(MONGODB_URL);
        isConnected = db.connections[0].readyState;
        console.log("DB is connected");
    }
    catch(err){
        console.log(err);
    }
} 

export default dbConnect;