import {
  userLoginRepo,
  userRegisterationRepo,
  getUserDetailsRepo,
  getUsersRepo,
  updateUserDetailsRepo
} from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

export const userRegisteration = async (req, res, next) => {
  let { email,password } = req.body;
  if(!email || !password)
    return res.status(200).json({
      success: false,
      msg: "Please enter email and password",
    });
  password = await bcrypt.hash(password, 12);
  let avatar = null;
  if(req.file){
    avatar = req.file.filename;
  }
  const resp = await userRegisterationRepo({ ...req.body, password ,avatar});
  if (resp.success) {
    res.status(201).json({
      success: true,
      msg: "user registration successful",
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};
export const userLogin = async (req, res, next) => {
  const resp = await userLoginRepo(req.body);
  if (resp.success) {
    const token = jwt.sign(
      { _id: resp.res._id, user: resp.res },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res
      .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
      .json({ success: true, msg: "user login successful", token });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};


export const userLogout = (req, res, next) => {
  res.clearCookie("jwtToken").json({ success: true, msg: "logout successful" });
};

export const getUserDetails = async (req,res,next) => {
  const {userId} = req.params;
  console.log(userId);
  const resp = await getUserDetailsRepo(userId);
  if (resp.success) {
    res.status(200).json({
      success: true,
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

export const getAllUsers = async (req,res,next) => {
  const resp = await getUsersRepo();
  if (resp.success) {
    res.status(200).json({
      success: true,
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

export const updateUserDetails = async (req,res,next) => {
  const { userId } = req.params;
  const { name, mobile, gender } = req.body;
  let updateData = null;
  if(req.file){
    const avatar = req.file.filename;
    updateData = { name, mobile, gender, avatar};
  }else{
    updateData = { name, mobile, gender};
  }
  const resp = await updateUserDetailsRepo(userId,updateData);
  if (resp.success) {
    res.status(200).json({
      success: true,
      res: resp.res,
    });
  } else {
    next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
}
