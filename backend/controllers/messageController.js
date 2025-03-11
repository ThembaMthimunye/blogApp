import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

export const sendMessage=async(req,res)=>{
    // console.log("message sent",req.params.id)
    try {
        const {message}=req.body
        const {id:receiverId}=req.params;
        const senderId=req.userId._id

        let conversation= await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants:{$all:[senderId,receiverId]}
            })

        }

        const newMessage=new Message({
            senderId:senderId,
            receiverId:receiverId,
            message:message
        })

        if (newMessage){
            conversation.messages.push(newMessage._id)
        }

        res.status(201).json(newMessage)
    } catch (error) {
        
    }
}