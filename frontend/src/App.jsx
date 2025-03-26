import { useEffect } from "react";
import axios from "axios";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { useAuthContext } from "./context/authContext.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
function App() {
  // const { authUser } = useAuthContext();

  // useEffect(() => {
  //   if (authUser) {
  //     // Set the authorization header if authUser is present
  //     axios.defaults.headers.common["authorization"] = `Bearer ${authUser.token}`;
  //   }
  // }, [authUser]);
  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   // sessionStorage.setItem("token",token)
  //   if (token) {
  //     axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  //   }
  // }, []);



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="" element={<Layout />}>
          <Route
            path="Home"  element={<Home />}
          />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update/:id" element={<UpdatePage />} />
          <Route path="read-blog/:id" element={<ReadBlog />} />
          <Route path="chat-side" element={ <ChatSide />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
