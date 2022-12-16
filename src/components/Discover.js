import React from "react";
import { TbMessage2 } from "react-icons/tb";

const Discover = () => {
  return (
    <div className="h-screen px-4">
      <div className="flex flex-col gap-y-3">
        <p>Who to Follow</p>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <img
                className="w-[2.15rem] h-[2.1rem] rounded-full object-cover "
                src="./assets/images/user2.jfif"
                alt="user"
              />
              <div>
                <p className="text-[0.95rem]">John Doe</p>
                <p className="text-[0.60rem] text-gray-500">@JohnDoe</p>
              </div>
            </div>
            <button className="bg-blue-600 px-3 rounded-2xl text-white py-1 text-[0.8rem]">
              Follow
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <img
                className="w-[2.15rem] h-[2.1rem] rounded-full object-cover "
                src="./assets/images/user2.jfif"
                alt="user"
              />
              <div>
                <p className="text-[0.95rem]">John Doe</p>
                <p className="text-[0.60rem] text-gray-500">@JohnDoe</p>
              </div>
            </div>
            <button className="bg-blue-600 px-3 rounded-2xl text-white py-1 text-[0.8rem]">
              Follow
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <img
                className="w-[2.15rem] h-[2.1rem] rounded-full object-cover "
                src="./assets/images/user2.jfif"
                alt="user"
              />
              <div>
                <p className="text-[0.95rem]">John Doe</p>
                <p className="text-[0.60rem] text-gray-500">@JohnDoe</p>
              </div>
            </div>
            <button className="bg-blue-600 px-3 rounded-2xl text-white py-1 text-[0.8rem]">
              Follow
            </button>
          </div>
        </div>
        <p>Show More</p>
      </div>

      <div className="flex flex-col gap-y-3 mt-5 justify-center">
        <p>Friends</p>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <img
                className="w-[2.15rem] h-[2.1rem] rounded-full object-cover "
                src="./assets/images/user2.jfif"
                alt="user"
              />
              <div>
                <p className="text-[0.95rem]">John Doe</p>
                <p className="text-[0.60rem] text-gray-500">@JohnDoe</p>
              </div>
            </div>
            <TbMessage2 size={23} className="text-gray-500" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <img
                className="w-[2.15rem] h-[2.1rem] rounded-full object-cover "
                src="./assets/images/user2.jfif"
                alt="user"
              />
              <div>
                <p className="text-[0.95rem]">John Doe</p>
                <p className="text-[0.60rem] text-gray-500">@JohnDoe</p>
              </div>
            </div>
            <TbMessage2 size={23} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
