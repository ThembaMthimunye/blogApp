import express from "express";
import {getDb} from "../connect.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { Login,createUser } from "../controllers/authController.js";
import protectRoute from "../middleware/protectRoute.js";
import { getAllUsers } from "../controllers/userController.js";
dotenv.config({ path: "./config.env" });


let userRoutes = express.Router();

///Retrive all Users

userRoutes.route("/user").get(async (req, res) => {
  let db = getDb();
  let data = await db.collection("users").find({}).toArray();
  if (data.length > 0) {
    res.json(data);
  } else {
    throw new Error("Data was not found");
  }
});

// for sidebar
userRoutes.get(`/`,protectRoute,getAllUsers)

//Retrieve one user

userRoutes.route("/user/:id").get(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("users")
    .findOne({ _id: new ObjectId(req.params.id) });
  if (Object.keys(data).length > 0) {
    res.json(data);
  } else {
    throw new Error("Data was not found");
  }
});

///Create a user
userRoutes.post(("/user/login") ,Login)
userRoutes.post(("/user/Create-User") ,createUser)


   
    


///Update One

userRoutes.route("/user/:id").put(async (req, res) => {
  let db = database.getDb();
  
  
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  if (req.body.password) {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log("password hashed")
  } else {
    hashedPassword = undefined;
  }

  let mongoObject = {
    $set: {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    },
  };

  try {
    let data = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);

    if (data.modifiedCount === 0) {
      return res.status(404).json({ error: "User not found or no changes made" });
    }

    res.json({ message: "User updated successfully", data });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});


//Delete One

userRoutes.route("/user/:id").delete(async (req, res) => {
  let db = database.getDb();
  let data = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});

///Login

userRoutes.route('/user/login').post(async(req,res)=>{
    let db=getDb()
    // const user=await db.collection('users').findOne({email:req.body.email})
    const user =await User.findOne({email:req.body.email})
    let email=req.body.email
    let password=req.body.password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
  }
    if(user)
    {
            let confirmation=await bcrypt.compare(req.body.password,user.password||"")
            if(confirmation){
                const token = generateTokenAndSetCookie(user._id, res);
                res.json({success:true,token})
            }else{
                res.json({success:false,message:"Could not Log In"})
            }
    

    }
    else{
        res.json({success:false,message:'User not found'})
    }
})


userRoutes.route("/post/:id/comment").post(async (req, res) => {
  let db = database.getDb();
  const { user, text } = req.body;

  try {
    const result = await db.collection("posts").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $push: { comments: { user, text, timestamp: new Date() } } }
    );

    res.json({ message: "Comment added!", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

userRoutes.route("/post/:id/react").put(async (req, res) => {
  let db = database.getDb();
  const { emoji } = req.body;

  try {
    const result = await db.collection("posts").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $inc: { [`reactions.${emoji}`]: 1 } }
    );

    res.json({ message: "Reaction added!", result });
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});





export default userRoutes;
