import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { 
    getLikes,
    toggleLike 
} from "./like.controller.js";

const router = express.Router();

router.route("/:id").get(auth,getLikes);
router.route("/toggle/:id").post(auth,toggleLike);

export default router;