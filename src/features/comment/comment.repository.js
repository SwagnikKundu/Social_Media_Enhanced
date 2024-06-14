import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";
import { postSchema } from "../post/post.schema.js";

const CommentModel = mongoose.model("Comment", commentSchema);
const PostModel = mongoose.model("Post", postSchema);

export const getCommentsRepo = async (postId) => {
    try{
        const comment = await CommentModel.find({ post: postId });
        if(!comment){
            return {
                success: false,
                error: { statusCode: 404, msg: "comment not found" },
              };
          }
          return { success: true, res: comment };
    }catch (error) {
      return { success: false, error: { statusCode: 400, msg: error } };
    }
};

export const addCommentRepo = async (commentData) => {
    try{
        console.log(commentData);
        const newComment = new CommentModel(commentData);
        await newComment.save();
        await PostModel.findByIdAndUpdate(newComment.post, { $push: { comments: newComment._id } });
        return { success: true, res: newComment };
    }catch (error) {
      return { success: false, error: { statusCode: 400, msg: error } };
    }
};

export const deleteCommentRepo = async (userId, commentId) => {
    try {
        const comment = await CommentModel.findById(commentId);
        if(!comment){
          return {
              success: false,
              error: { statusCode: 404, msg: "comment not found" },
            };
        }
        if (comment.user != userId)
          return { success: false, error: "Unauthorized Access" };
        const result = await CommentModel.findByIdAndDelete(commentId);
        await PostModel.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });
        return { success: true, res: result };
    } catch (error) {
        return { success: false, error: { statusCode: 400, msg: error } };
    }
};

export const updateCommentRepo = async (userId, commentId, commentChange) => {
    try {
        const comment = await CommentModel.findById(commentId);
        if(!comment){
          return {
              success: false,
              error: { statusCode: 404, msg: "comment not found" },
            };
        }
        if (comment.user != userId)
          return { success: false, error: "Unauthorized Access" };
        comment.comment = commentChange;
        const updatedComment = await comment.save();
        return { success: true, res: updatedComment };
    } catch (error) {
        return { success: false, error: { statusCode: 400, msg: error } };
    }
};