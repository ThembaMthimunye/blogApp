import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    imageId: {
        type: String,
    },
    like: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;

