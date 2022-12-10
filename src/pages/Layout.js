import React from "react";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Discover from "../components/Discover";

const Layout = () => {
  return (
    <div>
      <div className="flex mx-4 mt-4">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-3/5">
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
