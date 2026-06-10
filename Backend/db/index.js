import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const uri = `${process.env.MONGODB_URI}/${DB_NAME}`;
    const connectionInstance = await mongoose.connect(uri);

    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;