import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./src/features/user/user.routes.js";
import postRouter from "./src/features/post/post.routes.js";
import likeRouter from "./src/features/like/like.routes.js";
import otpRouter from "./src/features/otp/otp.routes.js";
import commentRouter from "./src/features/comment/comment.routes.js";
import friendRouter from "./src/features/friendship/friendship.routes.js";
import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorHandler.js";


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/otp", otpRouter);
app.use("/api/posts", postRouter);
app.use("/api/likes", likeRouter);
app.use("/api/comments", commentRouter);
app.use("/api/friends", friendRouter);


app.use(appLevelErrorHandlerMiddleware);

export default app;