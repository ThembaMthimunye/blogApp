import { useEffect } from "react";
import axios from "axios";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "./Pages/Contact.jsx";
import About from "./Pages/About.jsx";
import CreateBlog from "./Pages/CreateBlog.jsx";
import Home from "./Pages/Home.jsx";
import Landing from "./Pages/Landing.jsx";
import Profile from "./Pages/Profile.jsx";
import ReadBlog from "./Pages/ReadBlog.jsx";
import Layout from "./components/Layout.jsx";
import UpdatePage from "./Pages/UpdatePage.jsx";
import ChatSide from "./Pages/ChatSide.jsx";

function App() {
  useEffect(() => {
    // Check for token in sessionStorage and set the authorization header
    let token = sessionStorage.getItem("user");
    if (token) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Landing />} />

        {/* Protected routes with Layout */}
        <Route element={<Layout />}>
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update/:id" element={<UpdatePage />} />
          <Route path="home" element={<Home />} />
          <Route path="read-blog/:id" element={<ReadBlog />} />
          <Route path="chat-side" element={<ChatSide />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
