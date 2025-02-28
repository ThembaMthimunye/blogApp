import { useState, useEffect } from "react";
import { getPosts, getusers, getImage } from "../api";
import { IoTrendingUpOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Home = () => {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [images, setImages] = useState({});

  useEffect(() => {
    async function getAllData() {
      try {
        const [postsData, usersData] = await Promise.all([getPosts(), getusers()]);
        if (Array.isArray(postsData)) setPost(postsData);
        else setPost([]);
        if (Array.isArray(usersData)) setUsers(usersData);
        else setUsers([]);

        const imagePromises = postsData.map((item) => getImage(item.imageId));
        const imageResults = await Promise.all(imagePromises);
        const imageMap = {};
        postsData.forEach((item, index) => {
          imageMap[item._id] = imageResults[index];
        });
        setImages(imageMap);
      } catch (error) {
        console.error("Error fetching data:", error);
        setPost([]);
        setUsers([]);
      }
    }
    getAllData();
  }, []);

  const getAuthorName = (authorId) => {
    const author = users.find((user) => user._id === authorId);
    return author ? author.name : "Unknown";
  };

  const handleLike = (postId, currentLikes) => {
    const token = localStorage.getItem("user");
    if (token) {
      console.log(`Liked post ${postId}, likes: ${currentLikes + 1}`);
    } else {
      console.log("Please log in to like the post");
    }
  };

  return (
    <div className="w-screen h-screen text-center text-black">
      <div className="px-20 space-y-4 mt-10">
        <p className="font-mono text-left font-semibold">Blogs Published</p>
        <hr className="w-40 bg-black" />
      </div>

      <div className="flex w-full h-[80%] mx-auto mt-10 text-left pb-4">
        {post.length > 0 ? (
          <>
            <div className="flex-1 px-4">
              <div className="grid grid-cols-1 gap-6">
                {post.map((item) => {
                  const numberOfLikes = item.likes?.length || 0;
                  return (
                    <Link key={item._id} to={`/ReadBlog/${item._id}`}>
                      <div className="space-y-6 px-20 group hover:cursor-pointer">
                        <hr className="w-[60rem]" />
                        {/* Use CSS Grid for consistent layout */}
                        <div className="grid grid-cols-[2fr_1fr] gap-8 items-start">
                          <div className="space-y-4">
                            <div className="flex gap-4 text-[14px] text-gray-400">
                              <p>{getAuthorName(item.author)} @</p>
                              <p>
                                {new Date(item.dateCreated).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            <h1 className="text-xl font-semibold">{item.title}</h1>
                            <p className="font-serif text-xl">
                              {item.content.slice(0, 49)}...
                            </p>
                            <div className="flex gap-2">
                              <p className="bg-gray-200 max-w-16 rounded-full flex justify-center items-center px-2">
                                {item.category || "Food"}
                              </p>
                              <div className="flex gap-4">
                                <button
                                  className="block"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleLike(item._id, numberOfLikes);
                                  }}
                                >
                                  ❤️ {numberOfLikes}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end">
                            <img
                              src={images[item._id]?.data || ""}
                              className="w-[16rem] h-[10rem] object-cover"
                              alt={item.title}
                            />
                          </div>
                        </div>
                        <hr className="w-[60rem]" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Trending Section */}
            <div className="w-1/3 h-full p-4">
              <p className="flex font-semibold items-center text-3xl mb-4">
                Trending <IoTrendingUpOutline className="ml-2" />
              </p>
              <div className="space-y-6">
                {post.slice(0, 3).map((item, index) => (
                  <Link key={item._id} to={`/ReadBlog/${item._id}`}>
                    <div className="flex justify-start items-start gap-4">
                      <p className="text-8xl text-gray-300 font-bold">{`0${index + 1}`}</p>
                      <div className="space-y-2">
                        <div className="flex gap-4 text-[14px] text-gray-400">
                          <p>{getAuthorName(item.author)} @</p>
                          <p>{new Date(item.dateCreated).toLocaleDateString()}</p>
                        </div>
                        <h1 className="text-lg font-semibold">{item.title}</h1>
                        <p className="font-serif">{item.content.slice(0, 49)}...</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>No blog posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

// export default Home;