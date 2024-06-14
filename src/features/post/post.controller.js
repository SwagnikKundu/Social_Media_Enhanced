import { 
    addPostRepo,
    getPostRepo,
    getMyPostsRepo,
    deletePostRepo,
    updatePostRepo
} from "./post.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";


export const addPost = async (req, res, next) => {
    const imageUrl = req.file.filename;
    const user = req._id;
    const {caption} = req.body;

    const postData = {user,caption,imageUrl};
    const resp = await addPostRepo(postData);
    if (resp.success) {
        res.status(201).json({
          success: true,
          msg: "post added successfully",
          res: resp.res,
        });
      } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};

export const getPost = async (req, res, next) => {
    const {postId} = req.params;
    const resp = await getPostRepo(postId);
    if (resp.success) {
        res.status(201).json({
          success: true,
          msg: "post fetched successfully",
          res: resp.res,
        });
      } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};

export const getMyPosts = async (req, res, next) => {
  const resp = await getMyPostsRepo(req._id);
  if (resp.success) {
      res.status(201).json({
        success: true,
        msg: "posts fetched successfully",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

export const deletePost = async (req, res, next) => {
  const {postId} = req.params;
  const resp = await deletePostRepo(req._id,postId);
  if (resp.success) {
      res.status(201).json({
        success: true,
        msg: "posts deleted successfully",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};

export const updatePost = async (req, res, next) => {
  const {postId} = req.params;
  const imageUrl = req.file.filename;
  const {caption} = req.body;
  const updateData = {caption,imageUrl};
  const resp = await updatePostRepo(req._id,postId,updateData);
  if (resp.success) {
      res.status(201).json({
        success: true,
        msg: "posts updated successfully",
        res: resp.res,
      });
    } else {
      next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
  }
};