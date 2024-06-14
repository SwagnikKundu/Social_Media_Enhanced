import mongoose from "mongoose";
import {postSchema} from "./post.schema.js";
import {ObjectId} from "mongodb";

const PostModel = mongoose.model("Post", postSchema);

export const addPostRepo = async (postData) => {
    try {
      const newPost = new PostModel(postData);
      await newPost.save();
      return { success: true, res: newPost };
    } catch (error) {
      return { success: false, error: { statusCode: 400, msg: error } };
    }
};


export const getPostRepo = async (postId) => {
    try {
      const post = await PostModel.findOne({_id: new ObjectId(postId)});
      if(!post){
        return {
            success: false,
            error: { statusCode: 404, msg: "post not found" },
          };
      }
      return { success: true, res: post };
    } catch (error) {
      return { success: false, error: { statusCode: 400, msg: error } };
    }
};


export const getMyPostsRepo = async (userId) => {
  try {
    const post = await PostModel.find({ user: userId });
    if(!post){
      return {
          success: false,
          error: { statusCode: 404, msg: "post not found" },
        };
    }
    return { success: true, res: post };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};

export const deletePostRepo = async (userId,postId) => {
  try {
    const post = await PostModel.findById(postId);
    if(!post){
      return {
          success: false,
          error: { statusCode: 404, msg: "post not found" },
        };
    }
    if (post.user != userId)
      return { success: false, error: "Unauthorized Access" };
    const result = await PostModel.findByIdAndDelete(postId);
    return { success: true, res: result };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};

export const updatePostRepo = async (userId,postId,updateData) => {
  try {
    const post = await PostModel.findById(postId);
    if(!post){
      return {
          success: false,
          error: { statusCode: 404, msg: "post not found" },
        };
    }
    if (post.user != userId)
      return { success: false, error: "Unauthorized Access" };
    const updatedPost = await PostModel.findByIdAndUpdate(
      postId,
      { $set: updateData },
      { new: true }
    );
    return { success: true, res: updatedPost };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};
