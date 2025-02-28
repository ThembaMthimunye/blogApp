const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
const multer = require("multer");
// require("dotenv").config();

const upload = multer({ storage: multer.memoryStorage() });

let awsRoutes = express.Router();

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

// ✅ Fix: Use environment variables for AWS credentials
const s3bucket = "thembastorage";
const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
    ,
  },
});

// AWS_ACCESS_KEY=AKIAQXPZDEZJ55US2QFV;
// AWS_SECRET_KEY=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;

// ✅ Retrieve an image from S3
// awsRoutes.route("/images/:id").get(verifyToken, async (req, res) => {
//   try {
//     const id = req.params.id;
//     const bucketParams = { Bucket: s3bucket, Key: id };

//     const data = await s3Client.send(new GetObjectCommand(bucketParams));
//     const contentType = data.ContentType;
//     const srcString = await data.Body.transformToString("base64");
//     const imageSource = `data:${contentType};base64,${srcString}`;

//     res.json(imageSource);
//   } catch (error) {
//     console.error("Error fetching image:", error);
//     res.status(500).json({ message: "Error fetching image", error });
//   }
// });
awsRoutes.route("/images/:id").get(verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const bucketParams = { Bucket: s3bucket, Key: id };

    const data = await s3Client.send(new GetObjectCommand(bucketParams));

    if (!data.Body) {
      return res.status(404).json({ message: "Image not found" });
    }

    const contentType = data.ContentType;
    const srcString = await data.Body.transformToString("base64");
    const imageSource = `data:${contentType};base64,${srcString}`;

    res.json( imageSource );
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Error fetching image", error: error.message });
  }
}); 


// ✅ Upload an image to S3
awsRoutes.route("/images").post(verifyToken, upload.single("image"), async (req, res) => {
  try {
    

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.file;
    const bucketParams = {
      Bucket: s3bucket,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(bucketParams));
    res.json({ message: "Upload successful" });
    console.log("Uploaded file:", req.file);
  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
});


function verifyToken(req, res, next) {
  const authHeaders = req.headers["authorization"];
  const token = authHeaders && authHeaders.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.body.user = user;
    next();
  });
}

module.exports = awsRoutes;
