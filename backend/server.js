const connect = require('./connect');
const express = require("express");
const cors = require("cors");
const posts = require('./postRoutes.js');
const users = require('./userRoutes.js');
const awsRoutes = require('./awsRoutes');
const multer = require('multer');

// const upload = multer();
// const upload = multer({ storage: multer.memoryStorage() }); 
 // Ensure "image" matches the frontend file input name


const app = express();
const PORT = 8000;
// app.use(upload.any());
// app.use(upload.single("image"));
app.use(cors());
app.use(express.json());
app.use(posts);
app.use(users);
app.use(awsRoutes);


app.listen(PORT, () => {
    connect.connectToServer();
    console.log(`Server is running on Port ${PORT}`);
});
