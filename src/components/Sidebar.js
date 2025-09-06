import React, { useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { GrEmptyCircle } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { BsBookmarkPlus } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className=" h-full p-[1rem]">
      <div className="flex flex-col gap-y-6">
        <div className="">
          <ul className="flex flex-col mt-4">
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                `flex flex-row gap-3 items-center text-gray-500  hover:bg-gray-200  cursor-pointer rounded-md p-2 ${
                  isActive ? "bg-gray-400 text-white-100" : ""
                }`
              }
            >
              <span className="text-gray-900">
                <AiOutlineAppstore />
              </span>

              <h3 className="py-1">Feed</h3>
            </NavLink>
            {/* <NavLink
              to="/discover"
              className={({ isActive }) =>
                `flex flex-row gap-3 items-center text-gray-500  hover:bg-gray-200  cursor-pointer rounded-md p-2 ${
                  isActive ? "bg-gray-400 text-white-100" : ""
                }`
              }
            >
              <span>
                <GrEmptyCircle />
              </span>
              <div>
                <h3 className="py-1">
                  Discover
                </h3>
              </div>
            </NavLink> */}
            <NavLink
              to="/message"
              className={({ isActive }) =>
                `flex flex-row gap-3 items-center text-gray-500  hover:bg-gray-200  cursor-pointer rounded-md p-2 ${
                  isActive ? "bg-gray-400 text-white-100" : ""
                }`
              }
            >
              <span>
                <FaUserFriends />
              </span>
              <div>
                <h3 className=" py-1">
                  Message
                </h3>
              </div>
            </NavLink>
            <NavLink
              to="/notifications"
              className={({ isActive }) =>
                `flex flex-row gap-3 items-center text-gray-500  hover:bg-gray-200  cursor-pointer rounded-md p-2 ${
                  isActive ? "bg-gray-400 text-white-100" : ""
                }`
              }
            >
              <span>
                <IoCubeSharp />
              </span>
              <div>
                <h3 className=" py-1">
                  Notifications
                </h3>
              </div>
            </NavLink>
            <NavLink
              to="/bookmark"
              className={({ isActive }) =>
                `flex flex-row gap-3 items-center text-gray-500  hover:bg-gray-200  cursor-pointer rounded-md p-2 ${
                  isActive ? "bg-gray-400 text-white-100" : ""
                }`
              }
            >
              <span>
                <BsBookmarkPlus />
              </span>
              <div>
                <h3 className=" py-1">
                  Bookmarks
                </h3>
              </div>
            </NavLink>

            <NavLink
              to=""
              className={({ isActive }) =>
                `flex flex-row gap-3 items-center text-gray-500  hover:bg-gray-200  cursor-pointer rounded-md p-2 ${
                  isActive ? "bg-gray-400 text-white-100" : ""
                }`
              }
            >
              <span>
                <FiSettings />
              </span>
              <div>
                <p className=" py-1">
                  Settings
                </p>
              </div>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
