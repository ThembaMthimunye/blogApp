import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import aboutImage from "../assets/Pictures/loginImage.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();

  const joinUs = () => {
    navigate("/");
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-gray-50 text-gray-800 p-6">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] max-w-5xl">
        <img
          src={aboutImage}
          alt="About Us"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white p-5">
          <motion.h1
            className="text-5xl font-extrabold tracking-wide text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-lg mt-3 max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Discover the passion and stories behind <strong>THEe BLOG</strong>.
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mt-12 text-lg leading-relaxed space-y-8">
        <motion.p
          className="text-center text-xl text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          Welcome to <strong>THEe BLOG</strong>, where we bring you engaging, informative, and inspiring content on a variety of topics.
        </motion.p>

        {[
          {
            title: "Our Mission",
            color: "text-blue-600",
            content:
              "Our mission is simple: to inspire and inform. We believe in the power of storytelling and sharing knowledge that can positively impact lives.",
          },
          {
            title: "Who We Are",
            color: "text-green-600",
            content:
              "We are a team of writers, creatives, and curious minds, all passionate about sharing stories and ideas. Our contributors bring diverse perspectives, ensuring fresh and exciting content.",
          },
          {
            title: "Why Follow Us?",
            color: "text-purple-600",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Fresh Perspectives</strong>: Insightful articles, opinion pieces, and expert interviews.
                </li>
                <li>
                  <strong>In-Depth Guides</strong>: How-to articles and detailed guides on various topics.
                </li>
                <li>
                  <strong>Community Engagement</strong>: We love hearing from you! Join the discussion in our comments.
                </li>
              </ul>
            ),
          },
        ].map((section, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            <h2 className={`text-3xl font-semibold mb-4 ${section.color}`}>
              {section.title}
            </h2>
            <p>{section.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12">
        <motion.button
          onClick={joinUs}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg shadow-md hover:bg-blue-700 transition"
        >
          Join Our Community
        </motion.button>
      </div>
    </div>
  );
};

export default About;
