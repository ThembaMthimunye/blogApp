import React from "react";
import { Link } from "react-router-dom";
import { pageData } from "../assets/PageData/Pagedata";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { CiTwitter } from "react-icons/ci";
import { FaDribbble } from "react-icons/fa";
import { CiInstagram } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { SiDailydotdev } from "react-icons/si";
import { TfiWrite } from "react-icons/tfi";
import { MdContactSupport } from "react-icons/md";
const Navbar = () => {
  const navigate = useNavigate();
  function logout() {
    sessionStorage.removeItem("user");
    navigate("/");
  }
  return (
    <>
      <div className="flex px-10 py-6 text-sm font-bold text-gray-700 bg-white shadow-lg">
        <div className="flex justify-normal gap-20 items-center ">
          <Link to={"/Home"}>
            <SiDailydotdev className="text-4xl text-gray-500" />
          </Link>
          <div className="flex items-center bg-gray-200 rounded-full w-[30rem] px-4">
            <CiSearch className="text-gray-500 mr-2" />
            <input
              className="w-full h-8 bg-transparent outline-none"
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="flex gap-10 mx-[50rem] items-center">
          <Link to={"/CreateBlog"}>
            <div className="flex justify-center items-center gap-2">
              <TfiWrite className="size-6" />
              <p>write</p>
            </div>
          </Link>
          <Link to={"/Contact"}>
            <MdContactSupport className="size-8" />
          </Link>
          <Link
            to={'/Profile'}
            className="bg-gradient-to-r from-red-500 to-orange-500 rounded-full px-3.5 py-2"
          >
            T
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
