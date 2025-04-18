import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import { getReceiverSocketId,io } from "../socket/socket.js";
// export const sendMessage=async(req,res)=>{
//   console.log("message sent",req.params.id)
//     try {
//         const {message}=req.body
//         const {id:receiverId}=req.params;
//         const senderId = req.user._id; 
//         console.log("testing")

        

//         let conversation= await Conversation.findOne({
//             participants:{$all:[senderId,receiverId]}
//         })

//         if(!conversation){
//             conversation=await Conversation.create({
//                 participants:[senderId,receiverId]
//             })

//         }

//         const newMessage=new Message({
//             senderId:senderId,
//             receiverId:receiverId,
//             message:message
//         })

//         if (newMessage){
//             conversation.messages.push(newMessage._id)
//             await Promise.all([conversation.save(),newMessage.save()])
//         } 

//         const receiverSocketId = getReceiverSocketId(receiverId);
//         if(receiverSocketId){
//             io.to(receiverSocketId).emit("newMessage",newMessage);
//         }
        
//         res.status(201).json(newMessage)
//     } catch (error) {
//         console.error("Error sending message:", error);
//         res.status(500).json({ error: "Internal server error" }); 
//     }
// }
// messageController.js


// export const sendMessage = async (req, res) => {
//   console.log("message sent", req.params.id);
//   try {
//     const { message } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });

//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       message,
//     });

//     if (newMessage) {
//       conversation.messages.push(newMessage._id);
//       await Promise.all([conversation.save(), newMessage.save()]);
//     }

//     // Emit to both sender and receiver
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     const senderSocketId = getReceiverSocketId(senderId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }
//     if (senderSocketId) {
//       io.to(senderSocketId).emit("newMessage", newMessage);
//     }

//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// messageController.js (sendMessage)
// import Conversation from "../models/conversationModel.js";
// import Message from "../models/messageModel.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  console.log("message sent", req.params.id);
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      await Promise.all([conversation.save(), newMessage.save()]);
    }

    // Emit only to receiver
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user?._id;

        if (!senderId || !userToChatId) {
            return res.status(400).json({ error: "Invalid user IDs" });
        }

        console.log("Sender ID:", senderId);
        console.log("User to Chat ID:", userToChatId);

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(404).json({ error: "No conversation found" });
        }

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
