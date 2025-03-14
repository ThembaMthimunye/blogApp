import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

export const sendMessage=async(req,res)=>{
    //  console.log("message sent",req.params.id)
    try {
        const {message}=req.body
        const {id:receiverId}=req.params;
        const senderId = req.user.id; 

        

        let conversation= await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            })

        }

        const newMessage=new Message({
            senderId:senderId,
            receiverId:receiverId,
            message:message
        })

        if (newMessage){
            conversation.messages.push(newMessage._id)
            await Promise.all([conversation.save(),newMessage.save()])
        } 
        
        res.status(201).json(newMessage)
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" }); 
    }
}

export const getMessage=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages")

        res.status(200).json(conversation.messages)
        console.log("Sender ID:", senderId);
        console.log("User to Chat ID:", userToChatId);

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" }); 
    }
}