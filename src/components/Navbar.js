import React from "react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TbMessage2 } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import ProfilePage from "./Profile/ProfilePage";
import { useAuth } from "../contexts/auth/AuthProvider";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userAuthState, updateUserToken, isLoading } = useAuth();
  const user = userAuthState?.user;

  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1] || "";

  return (
    <>
      <div className="flex items-center mb-2 py-2">
        <div className="flex flex-col items-center w-1/5">
          <img
            className="w-[8rem] h-[4rem] bg-cover"
            src="./Assets/images/logo4.png"
            alt="profile"
          />
        </div>
        <div className="flex justify-between w-3/5 px-[1rem]">
          <span className="text-gray-700 text-[2rem] capitalize">{last}</span>
          <div className="flex px-1 py-1 bg-[#f5f7fb] rounded-md r">
            <div className="p-1 text-gray-400 mt-[7px]">
              <AiOutlineSearch size={15} title={"Search"} />
            </div>
            <input
              type="search"
              id="search-input"
              placeholder="Find friends, communities and pages here"
              className="outline-none text-[0.65rem] mx-1 bg-[#f5f7fb] w-[13rem] "
            />
          </div>
        </div>
        <div className="w-1/5 flex text-gray-400 items-center justify-between px-4">
          <div className="flex px-2 justify-between w-1/2">
            <div className="relative cursor-pointer">
              <TbMessage2 size={22} />
              <span className="w-[2px] h-[2px] p-2 bg-red-500 rounded-full absolute left-[1.20rem] bottom-[1.05rem] text-white text-[10px] font-bold flex justify-center items-center ">
                1
              </span>
            </div>

            <div className="mr-2 relative cursor-pointer">
              <IoMdNotificationsOutline size={22} />
              <span className="w-[2px] h-[2px] p-2 bg-red-500 rounded-full absolute left-[1rem] bottom-[1.05rem] text-gray-200 text-[10px] font-bold flex justify-center items-center shadow-2xl shadow-red-400/50">
                1
              </span>
            </div>
          </div>

          <div className="flex w-1/2 justify-end gap-1">
            {user?.profilePicture ? (
              <img
                className="w-[2.5rem] h-[2.5rem] rounded-full object-cover cursor-pointer"
                src={user.profilePicture}
                alt="user avatar"
                onClick={() => setIsModalOpen(true)}
              />
            ) : (
              <div
                className="w-[2.75rem] h-[2.75rem] flex items-center justify-center rounded-full bg-gray-400 text-white font-bold cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                {user?.username?.charAt(0) || "A"}
              </div>
            )}

            <ProfilePage
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
