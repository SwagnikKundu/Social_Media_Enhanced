import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.DB_URL || "0.0.0.0:27017";

export const connectToDb = async () => {
  try {
    await mongoose.connect(`${baseUrl}/socialdb`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
