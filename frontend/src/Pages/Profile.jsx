import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getPosts } from "@/api";
import login from "../assets/Pictures/loginImage.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { deletePost } from "@/api";

const YourComponent = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  

  async function handleDelete(postId) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const result = await deletePost(postId);
  
      if (result) {
        alert("Post deleted successfully");
  
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        alert("Failed to delete post");
      }
    }
  }
  
  useEffect(() => {
    async function loadData() {
      const token = sessionStorage.getItem("user");

      if (!token) {
        console.error("No token found in sessionStorage");
        return;
      }

      try {
        const decodedUser = jwtDecode(token);
        console.log("Decoded User:", decodedUser);

        if (!decodedUser.user || !decodedUser.user._id) {
          console.error("User ID not found in decoded token");
          return;
        }

        const allPosts = await getPosts();
        console.log("All Posts:", allPosts);

        const userId = decodedUser.user._id;
        const filteredPosts = allPosts.filter((post) => post.author === userId);

        setUser(decodedUser.user);
        setPosts(filteredPosts);

        console.log("Filtered Posts:", filteredPosts);
      } catch (error) {
        console.error("Error decoding token or fetching posts:", error);
      }
    }

    loadData();
  }, []);
  function link() {
    navigate(`/update/${user._id}`);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b  text-white flex flex-col items-center py-10">
      {/* Profile Section */}
      <div className="w-[70rem] flex flex-col justify-center items-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col w-[30rem] justify-center items-center bg-white/10 backdrop-blur-lg p-6  shadow-lg"
        >
          <img
            className="w-32 h-32 rounded-full border-4 border-gray-500 shadow-lg"
            src={login}
            alt="Profile"
          />
          <p className="text-gray-400 text-lg mt-4">@{user?.name || "guest"}</p>
          <p className="text-2xl font-semibold text-gray-200">
            {user?.name || "Guest"}
          </p>
          <CiEdit
            className="size-8 cursor-pointer mt-2 text-gray-400 hover:text-gray-200 transition"
            onClick={link}
          />
        </motion.div>
      </div>

      {/* Posts Section */}
      <div className="w-full max-w-6xl px-6">
        <h1 className="text-4xl font-bold text-left tracking-tight mb-10 text-gray-100 underline">
          My Posts
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <motion.div
                key={post._id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full"
              >
                <Card className="rounded-2xl shadow-xl overflow-hidden bg-white/10 backdrop-blur-lg text-white transition transform hover:shadow-2xl">
                  <CardHeader className="p-0">
                    <img
                      src={post.image || login}
                      alt="Post"
                      className="w-full h-52 object-cover rounded-t-2xl"
                    />
                    {/* <MdDeleteForever className="text-black size-10 hidden hover:block"/> */}
                    <MdDeleteForever
  onClick={() => handleDelete(post._id)}
  className="text-black size-10 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
/>

                  </CardHeader>
                  <CardContent className="p-5">
                    <CardTitle className="text-xl font-bold mb-2 text-gray-100">
                      {post.title}
                    </CardTitle>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 transition">
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
