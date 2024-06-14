import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { 
    getComments,
    addComment,
    deleteComment,
    updateComment 
} from "./comment.controller.js";

const router = express.Router();

router.route("/:postId").get(auth,getComments);
router.route("/:postId").post(auth,addComment);
router.route("/:commentId").delete(auth,deleteComment);
router.route("/:commentId").put(auth,updateComment);

export default router;