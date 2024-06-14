import { customErrorHandler } from "../../middlewares/errorHandler.js";
import { 
    getLikesRepo,
    toggleLikeRepo
} from "./like.repository.js";

export const toggleLike = async (req, res, next) => {
    const { model} = req.query;
    const {id} = req.params;
    if ((model != "Post" && model != "Comment") || !id) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide a valid model and id" });
    }
    const resp = await toggleLikeRepo(req.user._id, id, model);
    if (resp.success) {
        res.status(201).json({
          success: true,
          msg: resp.msg,
          res: resp.res,
        });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};

export const getLikes = async (req, res, next) => {
    const { model} = req.query;
    const {id} = req.params;
    if ((model != "Post" && model != "Comment") || !id) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide a valid model and id" });
    }
    const resp = await getLikesRepo(id, model);
    if (resp.success) {
        res.status(201).json({
          success: true,
          msg: "Likes fetched successfully",
          res: resp.res,
        });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};

