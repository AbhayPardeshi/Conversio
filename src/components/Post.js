import React, { useState, useRef, useEffect } from "react";
import { ImImage } from "react-icons/im";
import {
  AiOutlineVideoCamera,
  AiOutlineAudio,
  AiOutlineHeart,
  AiOutlineComment,
  AiFillHeart,
} from "react-icons/ai";
import { FiBookmark, FiShare2 } from "react-icons/fi";
import { IoMdAttach } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useFetch } from "../services/useFetch";
import { usePost } from "../contexts/posts/PostProvider";
import creationTime from "../utils/creationTime";
import { useAuth } from "../contexts/auth/AuthProvider";

const Post = ({ item, index }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(null);
  const {
    setPosts,
    deletePost,
    dislikePost,
    likePost,
  } = usePost();

  const { userAuthState, isLoading } = useAuth();
  let user = {};
  if (!isLoading) {
    user = userAuthState?.user._doc;
  }
  const userId = user._id;

  const handleLikeClick = (postId) => {
    if (!item.likes.includes(userId)) {
      likePost(postId);
    } else {
      dislikePost(postId);
    }
  };

  const handleBookmarkClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              bookmarked: !post.bookmarked,
            }
          : post
      )
    );
  };
  const toggleDropdown = (postId) => {
    setIsDropdownVisible((prevVisibleDropdown) =>
      prevVisibleDropdown === postId ? null : postId
    );
  };

  return (
    <>
      <div className="bg-white rounded-md p-5 justify-center mt-4 " key={index}>
        <div className="flex mt-[0.40rem] items-center gap-3">
          <img
            className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
            src="./assets/images/user2.jfif"
            alt="user"
          />
          <div className="flex justify-between w-full align-top">
            <div className="flex gap-4">
              <div>
                <span>John Doe</span>
                <span className="text-[0.75rem] text-gray-500 ml-2">
                  @JohnDoe
                </span>
              </div>
              <div>
                <span className="text-[0.75rem]">
                  {creationTime(item.date)}
                </span>
              </div>
            </div>
            <div className="relative inline-block">
              <button
                onClick={() => {
                  toggleDropdown(item._id);
                }}
                className=" text-black py-2 px-4 rounded focus:outline-none"
              >
                <BsThreeDots />
              </button>
              {isDropdownVisible === item._id && (
                <div className="dropdown-content absolute bg-white font-semibold border rounded shadow-md right-3 top-[25px] min-w-[80px]">
                  <p
                    className="p-2 hover:bg-gray-100 cursor-pointer text-xs "
                    onClick={() => deletePost(item._id)}
                  >
                    Delete Post
                  </p>
                  <p className="p-2 hover:bg-gray-100 cursor-pointer text-xs">
                    Edit Post
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pt-2 mx-12">
          <div>
            <p key={item.index}>{item.text}</p>
          </div>
          {item.imageURL && (
            <div>
              <img
                className="w-full h-[20rem] rounded-md object-cover mt-4"
                src={`http://localhost:3001${item.imageURL}`}
                alt="post"
              />
            </div>
          )}
        </div>
        <div className="flex mt-5 justify-between px-4 text-gray-600 mx-12">
          <button
            onClick={() => {
              handleLikeClick(item._id);
            }}
          >
            {item.likes && item.likes.find((id) => id === userId) ? (
              <AiFillHeart size={25} color="red" />
            ) : (
              <AiOutlineHeart size={25} />
            )}
          </button>
          <button>
            <AiOutlineComment size={25} />
          </button>
          <button
            onClick={() => {
              handleBookmarkClick(item._id);
            }}
          >
            {item.bookmarked ? (
              <BsFillBookmarkFill size={25} color="gray" />
            ) : (
              <FiBookmark size={25} />
            )}
          </button>

          <button>
            <FiShare2 size={25} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
