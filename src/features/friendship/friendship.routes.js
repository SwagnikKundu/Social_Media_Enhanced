import express from "express";
import { auth } from "../../middlewares/jwtAuth.js";
import { 
    getFriends,
    getPending,
    toggleFriendship,
    responseRequest 
} from "./friendship.controller.js";

const router = express.Router();

router.route("/get-friends/:userId").get(auth,getFriends);
router.route("/get-pending-requests").get(auth,getPending);
router.route("/toggle-friendship/:friendId").post(auth,toggleFriendship);
router.route("/response-to-request/:friendId").post(auth,responseRequest);

export default router;