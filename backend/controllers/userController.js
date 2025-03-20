import User from "../models/userModel.js"


export const getAllUsers=async(req,res)=>{

    try {
        const loggedInUser=req.user._id
        const filteredUsers=await User.find({_id:{$ne:loggedInUser}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.error("Error in getAllUser",error.message)
        res.status(500).json({error:"internal server error"})
    }
		// console.log(filteredUsers)
    
  }