import mongoose from "mongoose";
import {friendshipSchema} from "../friendship/friendship.schema.js";

const FriendshipModel = mongoose.model("Friend",friendshipSchema);

export const getFriendsByUserId = async (userId) => {
    try{
        const friendship = await FriendshipModel.find({ 
            $or: [
                { requester: userId, status: 'accepted' }, 
                { recipient: userId, status: 'accepted' }
            ]
        }).populate('requester', 'name gender avatar').populate('recipient', 'name gender avatar');
        if(!friendship){
            return {
                success: false,
                error: { statusCode: 404, msg: "no friends found" },
            };
        }
        return { success: true, res: friendship };
    }catch (error) {
        return { success: false, error: { statusCode: 400, msg: error } };
    }
};

export const getPendingRequests = async (userId) => {
    try{
        const friendship = await FriendshipModel.find({ 
            recipient: userId, 
            status: 'pending' 
        }).populate('requester', 'name gender avatar');
        if(!friendship || friendship.length==0){
            return {
                success: false,
                error: { statusCode: 200, msg: "no pending friendship requests found" },
            };
        }
        return { success: true, res: friendship };
    }catch (error) {
        return { success: false, error: { statusCode: 400, msg: error } };
    }
    
};

export const toggleFriendshipRepo = async (userId, friendId) => {
    try{
        const friendship = await FriendshipModel.findOne({ 
            $or: [
                { requester: userId, recipient: friendId , status: 'accepted'}, 
                { requester: friendId, recipient: userId , status: 'accepted'}
            ]
        });
    
        if (!friendship) {
            const friendship = new FriendshipModel({ requester: userId, recipient: friendId });
            await friendship.save();
            return { success: true, res: friendship };
        } else {
            const deleteRequest = await friendship.deleteOne();
            return { success: true, res: deleteRequest };
        }
    }catch (error) {
        return { success: false, error: { statusCode: 400, msg: error } };
    }
    
};

export const respondToRequestRepo = async (userId, friendId, response) => {
    try{
        const friendship = await FriendshipModel.findOne({ 
            requester: friendId, 
            recipient: userId, 
            status: 'pending' 
        });
    
        if (!friendship) {
            return { success: false, error: { statusCode: 400, msg: "Friendship request not found" } };
        }
    
        friendship.status = response;
        await friendship.save();
        return { success: true, res: friendship , msg: `Friendship request ${response}`};
    }catch (error) {
        return { success: false, error: { statusCode: 400, msg: error } };
    }
    
};