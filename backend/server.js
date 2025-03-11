import connectToServer from './connect.js';
import express from 'express';
import cors from 'cors';
import posts from './routes/postRoutes.js';
import users from './routes/userRoutes.js';
import awsRoutes from './routes/awsRoutes.js';
import multer from 'multer';
import messageRoutes from './routes/messageRoutes.js';

const app = express();
const PORT = 8000;

// Middleware
const upload = multer({ storage: multer.memoryStorage() });
// app.use(upload.any());
// app.use(upload.single("image"));

app.use(cors());
app.use(express.json());

// Routes
app.use(posts);
app.use(users);
app.use(awsRoutes);
app.use("/api/messages", messageRoutes);

// Start server
app.listen(PORT, async () => {
    try {
        await connectToServer(); // Actually call the function
        console.log(`Server is running on Port ${PORT}`);
    } catch (error) {
        console.error("Failed to start server:", error);
    }
});
