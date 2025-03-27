import connectToServer from './connect.js';
import express from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import authRoutes from './routes/authRoutes.js';
import awsRoutes from './routes/awsRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import multer from 'multer';
import cookieParser from "cookie-parser";
import userRoutes from './routes/userRoutes.js';
import {app,server} from "./socket/socket.js"

// const app = express();
const PORT = 8000;


const upload = multer({ storage: multer.memoryStorage() });
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/posts", postRoutes);
app.use("/api/users", authRoutes);
app.use("/api/aws", awsRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user",userRoutes)


server.listen(PORT, async () => {
    try {
        await connectToServer();
        console.log(`Server is running on Port ${PORT}`);
    } catch (error) {
        console.error("Failed to start server:", error);
    }
});
