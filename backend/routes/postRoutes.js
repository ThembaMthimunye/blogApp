import express from "express";
import getDb from "../connect.js"; 
import { ObjectId } from "mongodb"; 
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { updatePost ,onePost,createPost,deletePost, allPost} from "../controllers/postController.js"; 

// import getPost


let postRoutes = express.Router();


//Retrive all post
postRoutes.get("/post",verifyToken,allPost)
//Retrieve one Post
postRoutes.get("/post/:id",verifyToken,onePost)
///Create a post
postRoutes.post('/posts/create',verifyToken,createPost)
///Update One
postRoutes.put('/post/update/:id',verifyToken,updatePost)
//Delete One
postRoutes.delete('/post/delete/:id',verifyToken,deletePost)



postRoutes.route("/api/posts/:id/like").post(verifyToken, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
  }

  try {
      let db =getDb();
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
    let db = getDb();
    const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Ensure comments array exists
    const comments = Array.isArray(post.comments) ? post.comments : [];

    
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
export default postRoutes