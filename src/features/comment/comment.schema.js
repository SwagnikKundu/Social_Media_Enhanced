import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User', 
        required: 
        [
            true, "User Id is required"
        ]
    },
    post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Post', 
        required: 
        [
            true, "Post Id is required"
        ] 
    },
    comment: {
        type: String, 
        required: [
            true, "Comment body is required"
        ], 
        trim: true, 
        minlength: [
            1, "Comment body cannot be empty"
        ]
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Like'
        }
    ]

});