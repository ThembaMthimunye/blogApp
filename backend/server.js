import connectToServer from './connect.js';
import express from 'express';
import cors from 'cors';
import posts from './routes/postRoutes.js';
import users from './routes/userRoutes.js';
import awsRoutes from './routes/awsRoutes.js';
import multer from 'multer';
import messageRoutes from './routes/messageRoutes.js';
import cookieParser from "cookie-parser";
import postRoutes from './routes/postRoutes.js';


const app = express();
const PORT = 8000;

// Middleware
const upload = multer({ storage: multer.memoryStorage() });
// app.use(upload.any());
// app.use(upload.single("image"));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(posts);
app.use(users);
app.use(awsRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", postRoutes);

// Start server
app.listen(PORT, async () => {
    try {
        await connectToServer(); // Actually call the function
        console.log(`Server is running on Port ${PORT}`);
    } catch (error) {
        console.error("Failed to start server:", error);
    }
});
