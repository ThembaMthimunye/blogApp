import mongoose from "mongoose"

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,required:true,unique:true
    },
    password: { type:String,required:true},
    joinDate: {
        type: Date,
        default: Date.now, 
      },
      posts: [
        {
          type: String, // Store post IDs as strings for now
          default: "", // Optional: empty string if no post
        },
      ],
    profilePic:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    }
},{timestamps:true})

const user =mongoose.model('User',userSchema)
export default user