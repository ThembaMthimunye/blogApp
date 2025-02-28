import React, { useState, useRef, useEffect } from "react";
import { createPost } from "../api";
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import blogHero from "../assets/Pictures/loginImage.jpg";
import { motion } from "framer-motion";
import { BiImageAdd } from "react-icons/bi";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const inputFile = useRef(null);
  const MAX_FILE_SIZE = 1500000000;

  useEffect(() => {
    async function loadData() {
      const token = sessionStorage.getItem("user");

      if (!token) {
        console.error("No token found in sessionStorage");
        return;
      }

      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        setUserId(decodedUser.user._id);
        const id = decodedUser.user._id;
        console.log("User ID:", id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!userId) {
      alert("User not authenticated. Please log in.");
      return;
    }

    let data = {
      title,
      description,
      content,
      author: userId,
      dateCreated: new Date(),
      file,
      likes:0,
      comments:[]
    };

    await createPost(data);
    console.log("Submitted Post:", data);
     setTitle("");
     setDescription("");
    setContent("");
    setFile(null);
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];

    const fileExtension = file.name.substring(file.name.lastIndexOf("."));
    if (![".jpg", ".jpeg", ".png"].includes(fileExtension)) {
      alert("Files must be jpg, jpeg, or png.");
      inputFile.current.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File too big.");
      inputFile.current.value = "";
      return;
    }

    setFile(file);
  }

  return (
    <div className="min-h-screen w-screen pb-[5rem]">
    <div className="flex items-center justify-center">
      <div
  className="w-full max-w-4xl mt-20 px-4 py-3 bg-white shadow-lg rounded-lg text-center text-gray-600 border-2 border-dashed border-gray-500 h-[20rem] flex flex-col justify-center items-center space-y-4"
  onClick={() => inputFile.current.click()}
>
  {!file ? (
    <>
      <BiImageAdd className="text-4xl text-gray-400" />
      <span className="text-gray-500">Click to upload an image</span>
      <Button
        type="button"
        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
      >
        Choose Image
      </Button>
    </>
  ) : (
    <img
      src={file}
      alt="Preview"
      className="w-full h-full object-cover rounded-lg shadow-md"
    />
  )}
  <input
    type="file"
    ref={inputFile}
    onChange={handleFileUpload}
    className="hidden" 
    required
  />
</div>

    </div>
  
    <div className="flex justify-center mt-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
      >
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600">
              Title
            </label>
            <Input
              className="w-full px-4 py-3 rounded-lg border text-black focus:ring-2 focus:ring-blue-400"
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              maxLength={100}
            />
          </div>
  
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600">
              Description
            </label>
            <Input
              className="w-full px-4 py-3 rounded-lg border text-black focus:ring-2 focus:ring-blue-400"
              required
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              maxLength={200}
            />
          </div>
  
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-600">
              Content
            </label>
            <textarea
              className="w-full h-40 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 resize-none text-black"
              required
              onChange={(e) => setContent(e.target.value)}
              maxLength={3000}
            />
          </div>
  
          <Button
            type="submit"
            disabled={!file}
            className={`w-full text-lg font-semibold py-3 rounded-lg transition ${
              file
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Publish Blog
          </Button>
        </form>
      </motion.div>
    </div>
  </div>
  
  );
};

export default CreateBlog;
