import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { postSchema } from "../post/post.schema.js";
import { commentSchema } from "../comment/comment.schema.js";

const LikeModel = mongoose.model("Like", likeSchema);
const PostModel = mongoose.model("Post", postSchema);
const CommentModel = mongoose.model("Comment", commentSchema);

export const toggleLikeRepo = async (user_id, job_id, model) => {
    try{
        
        const existingLike = await LikeModel.findOne({
            user: user_id,
            likeable: job_id,
            on_model: model,
        });
        if (existingLike) {
            const like = await LikeModel.deleteOne({ _id: existingLike._id });
            if (model == 'Post') {
                await PostModel.findByIdAndUpdate(job_id, { $pull: { likes: existingLike._id } });
            } else if (model == 'Comment') {
                await CommentModel.findByIdAndUpdate(job_id, { $pull: { likes: existingLike._id } });
            }
            return { success: true,msg:'Like removed successfully', res: like };
        }else {
            const newLike = new LikeModel({
                user: user_id,
                likeable: job_id,
                on_model: model,
            });
            await newLike.save();
            if (model == 'Post') {
                await PostModel.findByIdAndUpdate(job_id, { $push: { likes: newLike._id } });
            } else if (model == 'Comment') {
                await CommentModel.findByIdAndUpdate(job_id, { $push: { likes: newLike._id } });
            }
            return { success: true,msg:'Like added successfully', res: newLike };
        }
    }catch (error) {
      return { success: false, error: { statusCode: 400, msg: error } };
    }
};


export const getLikesRepo = async (id, on_model) => {
    try{
        const filter = { likeable: id, on_model };

        const likeDoc = await LikeModel
        .find(filter)
        .populate({ path: "likeable", model: on_model });

        if (likeDoc) {
            likeDoc.likesCount = await LikeModel.countDocuments(filter);
            return { success: true, res: likeDoc};
        }
        return { success: false, error: { statusCode: 400, msg: "Like not found" } };
    }catch (error) {
      return { success: false, error: { statusCode: 400, msg: error } };
    }
};