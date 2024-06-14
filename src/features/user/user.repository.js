import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import {
  compareHashedPassword,
  hashPassword,
} from "../../utils/hashPassword.js";
import {ObjectId} from "mongodb";

const UserModel = mongoose.model("User", userSchema);

export const userRegisterationRepo = async (userData) => {
  try {
    const newUser = new UserModel(userData);
    await newUser.save();
    return { success: true, res: newUser };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
export const userLoginRepo = async (userData) => {
  try {
    const { email, password } = userData;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "user not found" },
      };
    } else {
      let passwordValidation = await compareHashedPassword(
        password,
        user.password
      );
      if (passwordValidation) {
        return { success: true, res: user };
      } else {
        return {
          success: false,
          error: { statusCode: 400, msg: "invalid credentials" },
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};


export const getUserDetailsRepo =  async (userId) => {
  try{
    const user = await UserModel.findOne({_id:new ObjectId(userId)}).select({_id:0, name:1, email:1, mobile:1, gender:1, avatar:1});
    if (!user) {
      return {
        success: false,
        error: { statusCode: 404, msg: "user not found" },
      };
    }
    return { success: true, res: user };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

export const getUsersRepo =  async () => {
  try{
    const users = await UserModel.find().select({_id:0, name:1, email:1, mobile:1, gender:1, avatar:1});
    if (!userSchema) {
      return {
        success: false,
        error: { statusCode: 404, msg: "no users found" },
      };
    }
    return { success: true, res: users };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};

export const updateUserDetailsRepo = async (userId, updateData) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true}
    ).select({_id:0, name:1, email:1, mobile:1, gender:1, avatar:1});
    if (!updatedUser) {
      return { success: false, error: { statusCode: 404, msg: 'User not found' } };
    }
    return { success: true, res: updatedUser };
  } catch (error) {
    return {
      success: false,
      error: { statusCode: 400, msg: error },
    };
  }
};
