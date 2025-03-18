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
		const token = req.params.token;
		 
		console.log(token)

		if (!token) {
			return res.status(401).json({ error: "Unauthorized - No Token Provided" });
		}

		const decoded = jwt.verify(token, "1234");

		if (!decoded || !decoded.userId) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}
		// console.log("MongoDB connection state:", mongoose.connection.readyState);
		const userId = decoded.userId;
		// console.log(userId);
		const cleanUserId = userId.trim();
		const user = await User.findById(cleanUserId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		req.user=user;
		// console.log(user)
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export default protectRoute;