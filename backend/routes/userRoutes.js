import express from "express";
import {getDb} from "../connect.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

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

// userRoutes.route("/user").post(async (req, res) => {
//     let db = database.getDb();
//   let hashedPassword =await bcrypt.hash(req.body.password, 10);
//   const matchEmail = await db.collection("users").findOne({ email: req.body.email });
//   if (matchEmail) {
//     res.json({ message: "The email is taken please use a different email" });
//   } else {
//     let mongoObject = {
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//       joinDate: new Date(),
//       posts: [],
//     };

//     let data = await db.collection("users").insertOne(mongoObject);
//     res.json(data);
//   }
  
// });

// userRoutes.route("/user").post(async (req, res) => {
//     try {
//       let db = database.getDb();
//       let hashedPassword = await bcrypt.hash(req.body.password, 10);
//       const matchEmail = await db.collection("users").findOne({ email: req.body.email });
//       const girlProfilePic="https://avatar.iran.liara.run/public/36"
//       const boyProfilePic="https://avatar.iran.liara.run/public/20"
//       if (matchEmail) {
//         return res.status(400).json({ message: "The email is taken please use a different email" });
//       } else {
//         let mongoObject = {
//           name: req.body.name,
//           email: req.body.email,
//           password: hashedPassword,
//           joinDate: new Date(),
//           posts: [],
//           gender:req.body.gender,
//           profilePic:gender==='male'?boyProfilePic:girlProfilePic
//         };
//         let data = await db.collection("users").insertOne(mongoObject);
//         res.status(201).json(data);
//       }
//     } catch (error) {
//       res.status(500).json({ message: "Error creating user", error: error.message });
//     }
//   });

userRoutes.route("/user").post(async (req, res) => {
  try {
    
    const { name, email, password, gender } = req.body;
    console.log("Extracted Data:", { name, email, password, gender }); 
    if (!name || !email || !password || !gender) {
      return res.status(400).json({ message: "All fields (name, email, password, gender) are required" });
    }
    if (!["male", "female", "other"].includes(gender)) {
      return res.status(400).json({ message: "Gender must be 'male', 'female', or 'other'" });
    }

    
    const db = getDb();
    if (!db) throw new Error("Database connection failed");

   
    const matchEmail = await db.collection("users").findOne({ email });
    if (matchEmail) {
      return res.status(400).json({ message: "The email is taken, please use a different email" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const girlProfilePic = "https://avatar.iran.liara.run/public/36";
    const boyProfilePic = "https://avatar.iran.liara.run/public/20";
    const otherProfilePic = "https://avatar.iran.liara.run/public/42";
    let profilePic;
    switch (gender) {
      case "male":
        profilePic = boyProfilePic;
        break;
      case "female":
        profilePic = girlProfilePic;
        break;
      case "other":
        profilePic = otherProfilePic;
        break;
      default:
        profilePic = ""; 
    }

    
    const mongoObject = {
      name,
      email,
      password: hashedPassword,
      joinDate: new Date(),
      posts: [],
      gender,
      profilePic,
    };

  
    const data = await db.collection("users").insertOne(mongoObject);

    
    res.status(201).json({
      success: true,
      data: {
        id: data.insertedId,
        name,
        email,
        gender,
        profilePic,
      },
    });
     generateTokenAndSetCookie( data.insertedId,res)
    console.log( data)
  } catch (error) {
    console.error("Error creating user:", error);
    // res.status(500).json({ message: "Server error creating user", error: error.message });
  }
});


///Update One

// userRoutes.route("/user/:id").put(async (req, res) => {
//   let db = database.getDb();
//   let mongoObject = {
//     $set: {
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
     
//     },
//   };
//   let data = await db
//     .collection("users")
//     .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);
//   res.json(data);
// });

// const { ObjectId } = require('mongodb');

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
    const user=await db.collection('users').findOne({email:req.body.email})
    if(user)
    {
            let confirmation=await bcrypt.compare(req.body.password,user.password||"")
            if(confirmation){
                const token = jwt.sign( {user },process.env.SECRETKEY,{ expiresIn: '1d' });
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



// /api/posts/${id}/like


export default userRoutes;
