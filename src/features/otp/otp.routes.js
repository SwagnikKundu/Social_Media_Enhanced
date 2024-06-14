import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { 
    requestOtp,
    verifyOtp
} from "./otp.controller.js";


const router = express.Router();

router.route("/send/:_id").get(requestOtp);
router.route("/verify/:_id").post(verifyOtp);


export default router;