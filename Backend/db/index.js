import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI);
    console.log("DB_NAME:", DB_NAME);

    const uri = `${process.env.MONGODB_URI}/${DB_NAME}`;
    console.log("FINAL URI:", uri);

    const connectionInstance = await mongoose.connect(uri);

    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;