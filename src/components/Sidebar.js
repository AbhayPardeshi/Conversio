import React, { useState } from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import { GrEmptyCircle } from "react-icons/gr";
import { FaUserFriends } from "react-icons/fa";
import { IoCubeSharp } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { BsBookmarkPlus } from "react-icons/bs";

const Sidebar = () => {
  return (
    <div className="h-screen px-[1rem]">
      <div className="flex flex-col ">
        <div className="">
          <ul>
            <li className="flex flex-row gap-3 items-center text-gray-500  hover:bg-blue-600 hover:text-gray-100 cursor-pointer rounded-md p-2">
              <span className="text-gray-900">
                <AiOutlineAppstore />
              </span>

              <h3 className="py-1">Feed</h3>
            </li>
            <li className="flex flex-row gap-3 items-center hover:bg-blue-600  hover:text-gray-100 cursor-pointer rounded-md p-2">
              <span>
                <GrEmptyCircle />
              </span>
              <div>
                <h3 className="text-gray-500 py-1 hover:text-gray-100">
                  Discover
                </h3>
              </div>
            </li>
            <li className="flex flex-row gap-3 items-center hover:bg-blue-600  hover:text-gray-100 cursor-pointer rounded-md p-2">
              <span>
                <FaUserFriends />
              </span>
              <div>
                <h3 className="text-gray-500 hover:text-gray-100 py-1">
                  Friends
                </h3>
              </div>
            </li>
            <li className="flex flex-row gap-3 items-center hover:bg-blue-600  hover:text-gray-100 cursor-pointer rounded-md p-2">
              <span>
                <IoCubeSharp />
              </span>
              <div>
                <h3 className="text-gray-500 hover:text-gray-100 py-1">
                  Community
                </h3>
              </div>
            </li>
            <li className="flex flex-row gap-3 items-center hover:bg-blue-600  hover:text-gray-100 cursor-pointer rounded-md p-2">
              <span>
                <BsBookmarkPlus />
              </span>
              <div>
                <h3 className="text-gray-500 hover:text-gray-100 py-1">
                  Bookmarks
                </h3>
              </div>
            </li>

            <li className="flex flex-row gap-3 items-center hover:bg-blue-600 cursor-pointer rounded-md p-2 hover:text-white">
              <span>
                <FiSettings />
              </span>
              <div>
                <p className=" hover:text-gray-100 text-gray-500 py-1">
                  Settings
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
