import { getDb } from "../connect.js";
import BlogPost from "../models/postsModel.js";




export const allPost=async (req,res)=>
{

  let data = await BlogPost.find();
  if (data.length > 0) {
    res.json(data)
  } else {
    console.log("Error in getUsersFor SideBar",error.message)
   res.status(500).json({error:"Internal server error"})
  }
}

export const onePost=async(req,res)=>{
  try {
    const post=await BlogPost.findById(req.params.id)
    if(post){
      res.json(post)
    } else {
      throw new Error("Data was not found");
  }
} catch (error) {
  res.status(500).json({ error: error.message });
}
}

export const createPost=async(req,res)=>{
  
  try {
    const newPost = new BlogPost({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author: req.body.author,
        dateCreated:  new Date(),
        imageId: req.body.imageId,
        like: 0
    });

    const savedPost = await newPost.save();
    res.json(savedPost);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

export const updatePost=async(req,res)=>{
  try {
    const updatedPost=await BlogPost.findByIdAndUpdate(
      req.params.id,{
              title: req.body.title,
              description: req.body.description,
              content: req.body.content,
              author: req.body.user._id,
              dateCreated: req.body.dateCreated,
              imageId: req.body.imageId
      },
      { new: true }
    )
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const deletePost=async(req,res)=>{
    try {
      const deletedPost=await BlogPost.findByIdAndDelete(req.params.id)
      res.json(deletedPost)
    } catch (error) {
      
    }
}