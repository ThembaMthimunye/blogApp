import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getuser, reaction, addComment } from "../api";
import { jwtDecode } from "jwt-decode";

const ReadBlog = () => {
  const [post, setPost] = useState({});
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLikedByUser, setIsLikedByUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userId, setUserId] = useState(null); // Store userId from token
  const[hidden,setHidden]=useState('hidden')
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const postData = await getPost(id);
        const userData = postData.author ? await getuser(postData.author) : null;

        const token = localStorage.getItem("user");
        let decodedUserId = null;
        if (token) {
          const decoded = jwtDecode(token);
          decodedUserId = decoded.id || decoded.user?._id; // Adjust based on token structure
          setUserId(decodedUserId);
        }

        const date = new Date(postData.dateCreated);
        const formattedDate = date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        setPost({ ...postData, dateCreated: formattedDate });
        setLikes(postData.likes || 0); // Expecting a number
        setIsLikedByUser(decodedUserId && postData.isLikedByUser || false);
        setComments(postData.comments || []); // Load existing comments
        setUser(userData || null);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const handleLike = async () => {
    const token = sessionStorage.getItem("user");
    if (!token) {
      console.log("Please log in to like the post");
      navigate("/");
      return;
    }

    try {
      const result = await reaction(id, token);
      if (result.likes !== undefined) {
        setLikes(result.likes); // result.likes is a number
        setIsLikedByUser(result.isLiked);
      }
    } catch (error) {
      console.error("Error reacting to post:", error);
    }
  };

  const handleComment = async () => {
    const token = sessionStorage.getItem("user");
    if (!token) {
      console.log("Please log in to comment");
      navigate("/login");
      return;
    }

    if (!newComment.trim()) {
      console.log("Comment cannot be empty");
      return;
    }
        const decodedUser = jwtDecode(token);
        console.log("Decoded User:", decodedUser);

        if (!decodedUser.user || !decodedUser.user._id) {
          console.error("User ID not found in decoded token");
          return;
        }

      // setUserIdecodedUser.user._id)

    if (!decodedUser.user._id) {
      console.log("User ID not available");
      return;
    }

    try {
      const result = await addComment(id, decodedUser.user._id, newComment, token);
      setComments([...comments, result.comment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center py-20 space-y-10">
      {post.imageId?.data && (
        <img className="w-[40rem] mt-20" src={post.imageId?.data} alt="Post Image" />
      )}

      <div className="w-full max-w-[40rem]">
        <h1 className="text-4xl font-semibold">{post.title}</h1>
      </div>

      <div className="flex items-center w-full max-w-[40rem] gap-4">
        {user && user.imageId?.data && (
          <img className="rounded-full w-10 h-10" src={user.imageId?.data} alt="User Avatar" />
        )}
        <div className="flex-1">
          <h1>{user?.name}</h1>
          <h1>{user?.email}</h1>
        </div>
        <p className="text-gray-500">{post.dateCreated}</p>
      </div>

      <div className="w-full max-w-[40rem] space-y-4">
        <hr className="w-full" />
        <div className="flex ">
          <button className="block" onClick={handleLike}>
            {isLikedByUser ? "💔" : "❤️"}
            {likes.length}
          </button>
          <button onClick={()=>setHidden(!hidden)} className="text-xl">🗨️ {comments.length}</button>
        </div>
        <hr />
      </div>

      <div className="w-full max-w-[40rem] ">
        <h1>{post.content}</h1>
      </div>

      {/* Comment Section */}
      <div className={`w-full max-w-[40rem] space-y-4 ${hidden}`}>
        <h2 className="text-2xl font-semibold">Comments</h2>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleComment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Post Comment
        </button>
        <p>Total Comments: {comments.length}</p>
        <div className="space-y-2">
          {comments.map((c, index) => (
            <p key={index} className="border-b py-2">
              {c.text} - <span className="text-gray-500">{new Date(c.dateCreated).toLocaleString()}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;