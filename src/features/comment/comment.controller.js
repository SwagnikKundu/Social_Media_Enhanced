import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { 
    getCommentsRepo,
    addCommentRepo,
    deleteCommentRepo,
    updateCommentRepo
} from "./comment.repository.js";

export const getComments = async (req, res, next) => {
    const { postId } = req.params;
    if(!postId)
        return res
        .status(400)
        .json({ success: false, msg: "Please provide a post id" });
    const resp = await getCommentsRepo(postId);
    if (resp.success) {
        res.status(200).json({
          success: true,
          msg: "comments fetched successfully",
          res: resp.res,
        });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};


export const addComment = async (req, res, next) => {
    const { postId } = req.params;
    const {comment} = req.body;
    const userId = req._id;
    const commentData = {user: userId, post: postId, comment: comment};
    
    const resp = await addCommentRepo(commentData);
    if (resp.success) {
        res.status(201).json({
          success: true,
          msg: "comments fetched successfully",
          res: resp.res,
        });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};

export const deleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const resp = await deleteCommentRepo(req._id,commentId);
    if (resp.success) {
        res.status(200).json({
          success: true,
          msg: "comments deleted successfully",
          res: resp.res,
        });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};

export const updateComment = async (req, res, next) => {
    const { commentId } = req.params;
    const {comment} = req.body;
    const resp = await updateCommentRepo(req._id,commentId,comment);
    if (resp.success) {
        res.status(200).json({
          success: true,
          msg: "comments updated successfully",
          res: resp.res,
        });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};

