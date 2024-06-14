import mongoose from "mongoose";


export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minLength: [3, "The name should be at least 3 characters long"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
  },
  mobile: {
    type: String,
    unique: true,
    required: [true, "Mobile number is reuired"],
  },
  password: { type: String, required: [true, "Password is required"] },
  gender: {
    type: String,
    enum: ["male", "female", "Rather not say"],
    required: [
      true,
      "Gender' is required; it must be either 'male,' 'female,' or 'Rather not say",
    ],
  },
  avatar: {
    type: String,
  }
});
