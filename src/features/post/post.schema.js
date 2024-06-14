import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User', 
        required: true 
    },
    caption: { type: String, required: true },
    imageUrl: { type: String, required: true },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Like'
        }
    ]
});