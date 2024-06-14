import mongoose from "mongoose";
import { otpSchema } from "./otp.schema.js";
import { userSchema } from "../user/user.schema.js";
import { 
    generateOtp,
    sendOtpEmail
} from "../../utils/otpSender.js";

const OtpModel = mongoose.model("Otp", otpSchema);
const UserModel = mongoose.model("User",userSchema);

export const requestOtpRepo = async (_id) => {
    try {
      const user = await UserModel.findOne({_id});
      if(!user){
        return { success: false, error: { statusCode: 400, msg: "User not found" } };
      }
      const otp = generateOtp();
      const result = await sendOtpEmail(user.email,otp);
      if(!result.success)
        return { success: false, error: { statusCode: 400, msg: result.msg } };
      const newOtp = new OtpModel({ user:user._id, otp });
      await newOtp.save();
      return { success: true, res: result.msg };
    } catch (error) {
      return { success: false, error: { statusCode: 400, msg: error } };
    }
};

export const verifyOtpRepo = async (_id,otp,newPassword) => {
    try {
      const user = await UserModel.findOne({_id});
      if(!user){
        return { success: false, error: { statusCode: 400, msg: "User not found" } };
      }
      const verify = await OtpModel.findOne({user:user._id, otp});
      if(!verify){
        return { success: false, error: { statusCode: 400, msg: "otp invalid or expired" } };
      }
      user.password = newPassword;
      const updatedUser = await user.save();
      await OtpModel.deleteOne({user:user._id, otp })
      return { success: true, res: updatedUser}
    } catch (error) {
      return { success: false, error: { statusCode: 400, msg: error } };
    }
};