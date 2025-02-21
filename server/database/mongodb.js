import mongoose from "mongoose";
import { MONGODB_URI, NODE_ENV } from "../config/env.js";

if(!MONGODB_URI) {
    throw new Error("please define the MONGODB_URI environment variable inside .env")
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log(`Connected to database ${NODE_ENV} `);
        
    } catch (error) {
        console.error('Error connecting to database',error);
    }
}

export default connectToDatabase