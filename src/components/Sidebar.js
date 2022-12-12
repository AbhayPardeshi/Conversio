import React from "react";
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
        <div className="flex flex-col gap-y-2 bg-[#f5f7fb] p-4 rounded-lg">
          <div className="flex flex-row gap-3">
            <img
              className="w-[2.65rem] h-[2.5rem] rounded-full object-cover"
              src="./assets/images/user1.jfif"
              alt="profile"
            />
            <div>
              <h3 className="font-bold">Olivia Doe</h3>
              <p className="text-gray-500 text-[0.75rem]">@OlviaDoe</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="flex flex-col items-center ">
              <p className="font-bold items-center text-sm">5.5k</p>
              <p className="text-gray-500 text-sm">Followers</p>
            </span>
            <span>
              <p className="flex flex-col items-center font-bold text-sm">
                100
              </p>
              <p className="text-gray-500 text-sm">Following</p>
            </span>
            <span>
              <p className="flex flex-col items-center font-bold text-sm">
                212
              </p>
              <p className="text-gray-500 text-sm">Post</p>
            </span>
          </div>
        </div>

        <div className="mt-4">
          <ul>
            <li className="flex flex-row gap-3 items-center hover:bg-blue-600 hover:text-gray-100 cursor-pointer rounded-md p-2">
              <span>
                <AiOutlineAppstore />
              </span>
              <div>
                <h3 className="text-gray-500 py-1 hover:text-gray-100">Feed</h3>
              </div>
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
