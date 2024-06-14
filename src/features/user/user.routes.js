import express from "express";
import {
  userLogin,
  userLogout,
  userRegisteration,
  getUserDetails,
  getAllUsers,
  updateUserDetails 
} from "./user.controller.js";
import { auth } from "../../middlewares/jwtAuth.js";
import { upload } from "../../middlewares/upload.js";

const router = express.Router();

router.route("/register").post(upload.single('avatar'),userRegisteration);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogout);
router.route("/get-details/:userId").get(auth, getUserDetails);
router.route("/get-all-details").get(auth, getAllUsers);
router.route("/update-details/:userId").put(auth, upload.single('avatar'), updateUserDetails );

export default router;
