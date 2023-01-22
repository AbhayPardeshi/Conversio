import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Discover from "../components/Discover";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col mx-4 mt-4">
      <div>
        <Navbar />
      </div>
      <div className="flex w-full h-screen overflow-auto">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-3/5 h-max-screen overflow-auto">
          <Feed />
        </div>
        <div className="w-1/5">
          <Discover />
        </div>
      </div>
    </div>
  );
};

export default Layout;
