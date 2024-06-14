import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { upload } from "../../middlewares/upload.js";
import { 
    getPost,
    addPost,
    getMyPosts,
    deletePost,
    updatePost 
} from "./post.controller.js";

const router = express.Router();

router.route("/").post(auth,upload.single('imageUrl'),addPost);
router.route("/:postId").get(auth,getPost);
router.route("/").get(auth,getMyPosts);
router.route("/:postId").delete(auth,deletePost);
router.route("/:postId").put(auth,upload.single('imageUrl'),updatePost);

export default router;
