import { 
    getFriendsByUserId,
    getPendingRequests,
    toggleFriendshipRepo,
    respondToRequestRepo
} from "./friendship.repository.js";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

export const getFriends = async (req, res, next) => {
    const {userId} = req.params;
    const resp = await getFriendsByUserId(userId);
    if (resp.success) {
        res.status(200).json({
          success: true,
          msg: "friends fetched successfully",
          res: resp.res,
        });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};

export const getPending = async (req, res, next) => {
    const resp = await getPendingRequests(req._id);
    if (resp.success) {
        res.status(200).json({
          success: true,
          msg: "pending requests fetched successfully",
          res: resp.res,
        });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};

export const toggleFriendship = async (req, res, next) => {
    const {friendId} = req.params;
    if(req._id == friendId)
        return res.status(400).json({
            success: false,
            error: "friendship cannot be toggled to oneself"
        });
    const resp = await toggleFriendshipRepo(req._id,friendId);
    if (resp.success) {
        res.status(200).json({
          success: true,
          msg: "friendship toggled successfully",
          res: resp.res,
        });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};

export const responseRequest = async (req, res, next) => {
    const {friendId} = req.params;
    const {response} = req.body;
    const resp = await respondToRequestRepo(req._id,friendId,response);
    if (resp.success) {
        res.status(200).json({
          success: true,
          msg: res.msg,
          res: resp.res,
        });
    } else {
        next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    }
};