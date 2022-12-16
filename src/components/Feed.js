import React from "react";
import { ImImage } from "react-icons/im";
import {
  AiOutlineVideoCamera,
  AiOutlineAudio,
  AiOutlineHeart,
  AiOutlineComment,
} from "react-icons/ai";
import { FiBookmark, FiShare2 } from "react-icons/fi";
import { IoMdAttach } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

const Feed = () => {
  return (
    <>
      <section className="p-[1rem] bg-[#f5f7fb] rounded-md overflow-auto max-h-full">
        <div className="bg-white flex p-5 gap-4 rounded-md justify-center">
          <div className="mt-[0.40rem]">
            <img
              className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
              src="./assets/images/user1.jfif"
              alt="user"
            />
          </div>
          <div className="flex flex-col w-full gap-y-4">
            <textarea
              name="post-area"
              id="search-input"
              cols="55"
              rows="3"
              placeholder="Find friends, communities and pages here"
              className="outline-none text-[0.65rem] mx-1 bg-[#f5f7fb] w-full p-3 rounded-2xl flex items-center"
            />
            <div className="flex text-gray-500 justify-around">
              <button className="flex text-[0.85rem] px-2 py-1 rounded-md items-center gap-x-2 ">
                <ImImage />
                <p>Image</p>
              </button>
              <button className="flex text-[0.85rem] px-2 py-1 rounded-md items-center gap-x-2">
                <AiOutlineVideoCamera />
                <p>Video/Gif</p>
              </button>
              <button className="flex text-[0.85rem] px-2 py-1 rounded-md items-center gap-x-2">
                <IoMdAttach />
                <p>Attachements</p>
              </button>
              <button className="flex text-[0.85rem] px-2 py-1 rounded-md items-center gap-x-2">
                <AiOutlineAudio />
                <p>Audio</p>
              </button>
              <div>
                <button className="bg-blue-600 text-white rounded-2xl px-4 py-1 text-[0.85rem]">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md p-5 justify-center mt-4">
          <div className="flex mt-[0.40rem] items-center gap-3">
            <img
              className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
              src="./assets/images/user2.jfif"
              alt="user"
            />
            <div className="flex justify-between w-full align-top">
              <div className="flex gap-4">
                <div>
                  <p>John Doe</p>
                  <p className="text-[0.75rem] text-gray-500">@JohnDoe</p>
                </div>
                <div>
                  <span className="text-[0.75rem]">2 hours ago</span>
                </div>
              </div>
              <button>
                <BsThreeDots />
              </button>
            </div>
          </div>
          <div className="pt-2">
            <div>
              <p>Happy Christmas !!!</p>
            </div>
            <div>
              <img
                className="w-full h-[25rem] rounded-md object-cover mt-4"
                src="./assets/images/img1.jpg"
                alt="post"
              />
            </div>
          </div>
          <div className="flex mt-5 justify-between px-4 text-gray-600">
            <button>
              <AiOutlineHeart size={25} />
            </button>
            <button>
              <AiOutlineComment size={25} />
            </button>
            <button>
              <FiBookmark size={25} />
            </button>

            <button>
              <FiShare2 size={25} />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-md p-5 justify-center mt-4">
          <div className="flex mt-[0.40rem] items-center gap-3">
            <img
              className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
              src="./assets/images/user2.jfif"
              alt="user"
            />
            <div className="flex justify-between w-full align-top">
              <div className="flex gap-4">
                <div>
                  <p>John Doe</p>
                  <p className="text-[0.75rem] text-gray-500">@JohnDoe</p>
                </div>
                <div>
                  <span className="text-[0.75rem]">2 hours ago</span>
                </div>
              </div>
              <button>
                <BsThreeDots />
              </button>
            </div>
          </div>
          <div className="pt-2">
            <div>
              <p>Happy Christmas !!!</p>
            </div>
            <div>
              <img
                className="w-full h-[25rem] rounded-md object-cover mt-4"
                src="./assets/images/img1.jpg"
                alt="post"
              />
            </div>
          </div>
          <div className="flex mt-5 justify-between px-4 text-gray-600">
            <button>
              <AiOutlineHeart size={25} />
            </button>
            <button>
              <AiOutlineComment size={25} />
            </button>
            <button>
              <FiBookmark size={25} />
            </button>

            <button>
              <FiShare2 size={25} />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-md p-5 justify-center mt-4">
          <div className="flex mt-[0.40rem] items-center gap-3">
            <img
              className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
              src="./assets/images/user2.jfif"
              alt="user"
            />
            <div className="flex justify-between w-full align-top">
              <div className="flex gap-4">
                <div>
                  <p>John Doe</p>
                  <p className="text-[0.75rem] text-gray-500">@JohnDoe</p>
                </div>
                <div>
                  <span className="text-[0.75rem]">2 hours ago</span>
                </div>
              </div>
              <button>
                <BsThreeDots />
              </button>
            </div>
          </div>
          <div className="pt-2">
            <div>
              <p>Happy Christmas !!!</p>
            </div>
            <div>
              <img
                className="w-full h-[25rem] rounded-md object-cover mt-4"
                src="./assets/images/img1.jpg"
                alt="post"
              />
            </div>
          </div>
          <div className="flex mt-5 justify-between px-4 text-gray-600">
            <button>
              <AiOutlineHeart size={25} />
            </button>
            <button>
              <AiOutlineComment size={25} />
            </button>
            <button>
              <FiBookmark size={25} />
            </button>

            <button>
              <FiShare2 size={25} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Feed;
