import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TbMessage2 } from "react-icons/tb";
import { IoMdNotificationsOutline, IoMdArrowDropdown } from "react-icons/io";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center mb-4">
        <div className="flex flex-col items-center w-1/5">
          <img
            className="w-48 h-12 p-2 "
            src="./Assets/images/name.png"
            alt="profile"
          />
        </div>
        <div className="flex justify-between w-3/5 px-[1rem]">
          <p className="font-bold text-[1.5rem]">Feed</p>
          <div className="flex px-1 py-1 bg-[#f5f7fb] rounded-md ">
            <div className="p-1 text-gray-400 mt-[3px]">
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
            <div className="relative">
              <TbMessage2 size={22} />
              <span className="w-[2px] h-[2px] p-2 bg-red-500 rounded-full absolute left-[1.20rem] bottom-[1.05rem] text-white text-[10px] font-bold flex justify-center items-center ">
                1
              </span>
            </div>
            <div className="mr-2 relative">
              <IoMdNotificationsOutline size={22} />
              <span className="w-[2px] h-[2px] p-2 bg-red-500 rounded-full absolute left-[1rem] bottom-[1.05rem] text-gray-200 text-[10px] font-bold flex justify-center items-center shadow-2xl shadow-red-400/50">
                1
              </span>
            </div>
          </div>
          <div className="flex w-1/2 justify-end gap-1">
            <img
              className="w-[2.35rem] h-[2.15rem] rounded-full object-cover"
              src="./assets/images/user1.jfif"
              alt="user"
            />
            <span className="mt-[8px] cursor-pointer">
              <IoMdArrowDropdown />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
