import jwt from "jsonwebtoken";
 import User from "../models/userModel.js";
 import { ObjectId } from "mongodb";
 import { getDb } from "../connect.js";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://218634567:KEdDYtAZoIGAiIYN@cluster0.46whv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

const protectRoute = async (req, res, next) => {
	try {
	  let token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
  
	  console.log("Token received:", token);
  
	  if (!token) {
		return res.status(401).json({ error: "Unauthorized - No Token Provided" });
	  }
  
	  const decoded = jwt.verify(token, "1234"); // Make sure the secret matches
  
	  if (!decoded || !decoded.userId) {
		return res.status(401).json({ error: "Unauthorized - Invalid Token" });
	  }
  
	  const user = await User.findById(decoded.userId.trim());
	  if (!user) {
		return res.status(404).json({ error: "User not found" });
	  }
  
	  req.user = user;
	  next();
	} catch (error) {
	  console.error("Error in protectRoute middleware:", error.message);
	  res.status(500).json({ error: "Internal server error" });
	}
  };
  

export default protectRoute;