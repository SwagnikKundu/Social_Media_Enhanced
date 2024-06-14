import { 
  requestOtpRepo,
  verifyOtpRepo 
} from "./otp.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import bcrypt from "bcrypt";

export const requestOtp = async (req, res, next) => {
    const {_id} = req.params;
    const resp = await requestOtpRepo(_id);
    if (resp.success) {
        res.status(201).json({
          success: true,
          msg: "otp sent successfully"
        });
      } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};
  
export const verifyOtp = async (req, res, next) => {
    const {_id} = req.params;
    let { otp, newPassword } = req.body;
    newPassword = await bcrypt.hash(newPassword, 12);
    const resp = await verifyOtpRepo(_id,otp,newPassword);
    if (resp.success) {
        res.status(201).json({
          success: true,
          msg: resp.res
        });
      } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};