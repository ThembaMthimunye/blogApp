// const { MongoClient, ServerApiVersion } = require("mongodb");
// require("dotenv").config();

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient("mongodb+srv://218634567:KEdDYtAZoIGAiIYN@cluster0.46whv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// module.exports = {
//   connectToServer: () => {
//     database = client.db("blogData");
//   },
//   getDb: () => {
//     return database;
//   },
// };

import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const client = new MongoClient("mongodb+srv://218634567:KEdDYtAZoIGAiIYN@cluster0.46whv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

export default async function connectToServer() {
  try {
    await client.connect();
    database = client.db("blogData");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

export  function getDb() {
  if (!database) {
    throw new Error("Database not connected. Call connectToServer first.");
  }
  return database;
}

