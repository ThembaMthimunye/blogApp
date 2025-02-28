const express = require("express");
const database = require("./connect");
const ObjectId=require('mongodb').ObjectId
const jwt=require('jsonwebtoken')
require("dotenv").config({ path: "./config.env" });
// import getPost


let postRoutes = express.Router();

///Retrive all posts

postRoutes.route("/post").get(verifyToken,  async (req, res) => {
  let db = database.getDb();
  let data = await db.collection("posts").find({}).toArray();
  if (data.length > 0) {
    res.json(data)
  } else {
    throw new Error("Data was not found")
  }
});
//Retrieve one Post


postRoutes.route('/post/:id').get(verifyToken,  async(req,res)=>{
    let db=database.getDb();
    let data=await db.collection("posts").findOne(({_id:new ObjectId(req.params.id)}))
    if(Object.keys(data).length>0){
        res.json(data)
    }else{
        throw new Error("Data was not found")
    }
})


///Create a post 

postRoutes.route('/posts').post(verifyToken, async(req,res)=>{
    let db=database.getDb();
    let mongoObject={
        title:req.body.title,
        description:req.body.description,
        content:req.body.content,
        author:req.body.author,
        dateCreated:req.body.dateCreated,
        imageId:req.body.imageId,
        like:0
    }

    let data =await db.collection("posts").insertOne(mongoObject)
    res.json(data)
})


///Update One

postRoutes.route('/post/:id').put(verifyToken, async(req,res)=>{
    let db=database.getDb();
    let mongoObject={
        $set:{
            title:req.body.title,
        description:req.body.description,
        content:req.body.content,
        author:req.body.user._id,
        dateCreated:req.body.dateCreated,
        imageId:request.body.imageId
        }
    }
    let data=await db.collection('posts').updateOne({_id:new ObjectId(req.params.id)},mongoObject)
    res.json(data)
})

//Delete One

postRoutes.route('/post/:id').delete(verifyToken, async(req,res)=>{
    let db=database.getDb();
    let data=await db.collection('posts').deleteOne({_id:new ObjectId(req.params.id)})
    res.json(data)
})

// routes/posts.js

// postRoutes.route("/api/posts/:id/like").post(verifyToken, async (req, res) => {
//     const { id } = req.params;
//     const { userId } = req.body; // Get userId from request body
  
//     try {
//       const post = await post.findById(id); // Find the post by ID
  
//       if (!post) {
//         return res.status(404).json({ message: "Post not found" });
//       }
  
//       // Toggle like functionality
//       const hasLiked = post.likes.includes(userId);
//       if (hasLiked) {
//         // If user has already liked the post, remove like
//         post.likes = post.likes.filter((id) => id !== userId);
//       } else {
//         // If user hasn't liked the post, add like
//         post.likes.push(userId);
//       }
  
//       await post.save(); // Save the post with updated likes
//       res.status(200).json({
//         likes: post.likes.length, // Return the updated like count
//         isLiked: !hasLiked, // Return the new state of the like (true/false)
//       });
//     } catch (error) {
//       console.error("Error updating like:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });

// postRoutes.route("/api/posts/:id/like").post(verifyToken, async (req, res) => {
//   const { id } = req.params;
//   const { userId } = req.body; // Get userId from request body

//   try {
//       let db = database.getDb();
      
//       // Find the post
//       const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });

//       if (!post) {
//           return res.status(404).json({ message: "Post not found" });
//       }

//       // Ensure likes array exists
//       if (!Array.isArray(post.likes)) {
//           post.likes = [];
//       }

//       // Toggle like functionality
//       const hasLiked = post.likes.includes(userId);
//       let updateQuery;

//       if (hasLiked) {
//           // Remove like
//           updateQuery = {
//               $pull: { likes: userId }
//           };
//       } else {
//           // Add like
//           updateQuery = {
//               $push: { likes: userId }
//           };
//       }

//       // Update the post in the database
//       const result = await db.collection("posts").updateOne(
//           { _id: new ObjectId(id) },
//           updateQuery
//       );

//       // Get updated post to return current like count
//       const updatedPost = await db.collection("posts").findOne({ _id: new ObjectId(id) });

//       res.status(200).json({
//           likes: updatedPost.likes.length,
//           isLiked: !hasLiked
//       });

//   } catch (error) {
//       console.error("Error updating like:", error);
//       res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// });

postRoutes.route("/api/posts/:id/like").post(verifyToken, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
  }

  try {
      let db = database.getDb();
      const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });

      if (!post) {
          return res.status(404).json({ message: "Post not found" });
      }

      const likes = Array.isArray(post.like) ? post.like : [];
      const hasLiked = likes.includes(userId);
      if (likes.includes(userId)) {
        return res.status(400).json({ message: "User already liked this post" });
      }else{}
      const updateQuery = hasLiked 
          ? { $pull: { likes: userId } }
          : { $push: { likes: userId } };

      await db.collection("posts").updateOne(
          { _id: new ObjectId(id) },
          updateQuery
      );

      const updatedPost = await db.collection("posts").findOne({ _id: new ObjectId(id) });

      res.status(200).json({
          likes: updatedPost.likes.length,
          isLiked: !hasLiked
      });
  } catch (error) {
      console.error("Error updating like:", error);
      res.status(500).json({ 
          likes: post?.likes?.length || 0, 
          isLiked: hasLiked, 
          error: error.message 
      });
  }
});


//     //    //   //      //Comments///        ///                  //// 



postRoutes.route("/api/posts/:id/comment").post(verifyToken, async (req, res) => {
  const { id } = req.params;
  const { userId, comment } = req.body; // Expect userId and comment text in the body

  // Validate input
  if (!userId || !comment) {
    return res.status(400).json({ message: "User ID and comment text are required" });
  }

  try {
    let db = database.getDb();
    const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Ensure comments array exists
    const comments = Array.isArray(post.comments) ? post.comments : [];

    // Optional: Check if user has already commented (if you want to restrict multiple comments)
    // const hasCommented = comments.some(c => c.userId === userId);
    // if (hasCommented) {
    //   return res.status(400).json({ message: "User has already commented on this post" });
    // }

    // Create a new comment object
    const newComment = {
      userId,
      text: comment,
      dateCreated: new Date(), // Add timestamp
    };

    // Update the post by pushing the new comment
    const updateQuery = {
      $push: { comments: newComment },
    };

    await db.collection("posts").updateOne(
      { _id: new ObjectId(id) },
      updateQuery
    );

    // Fetch the updated post
    const updatedPost = await db.collection("posts").findOne({ _id: new ObjectId(id) });

    res.status(200).json({
      commentCount: updatedPost.comments.length, // Return total number of comments
      comment: newComment, // Return the newly added comment
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      commentCount: post?.comments?.length || 0,
      error: error.message,
    });
  }
});




//   //   //    //   //      // 
function verifyToken(req,res,next){
    const authHeaders=req.headers['authorization']
    const token=authHeaders&&authHeaders.split(' ')[1]
    if(!token){
         return res.status(401).json({message:"Authentication  token missing "})
     }
       jwt.verify(token,process.env.SECRETKEY,(error,user)=>{
         if(error){
             return res.status(403).json({message:"invalid token "})
         }

        req.body.user=user
         next()
     })
}
module.exports=postRoutes