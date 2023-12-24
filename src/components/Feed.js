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

const Feed = () => {
  const fileInputRef = useRef(null);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(null);
  const {
    posts,
    setPosts,
    sendData,
    serverResponse,
    deletePost,
    postDispatch,
  } = usePost();
  
  const setPostHandler = () => {
    const newPost = {
      id: new Date().getTime().toString(),
      text: postText,
      imageURL: postImage,
    };

    sendData(newPost);
    setPostText("");
    setPostImage("");
    setImagePreview("");
  };
  const setPostTextHandler = (e) => {
    setPostText(e.target.value);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPostImage(imageUrl);
      setImagePreview(imageUrl);
    }
  };
  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const handleLikeClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
            }
          : post
      )
    );
  };
  const handleBookmarkClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
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
      <section className="p-[1rem]  rounded-md">
        {/* Post Area */}
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
              className="outline-none text-[0.65rem] mx-1 bg-[#f5f7fb] w-full p-3 rounded-2xl flex items-center resize-none"
              onChange={setPostTextHandler}
              value={postText}
            />
            <div className="flex justify-between p-2">
              {imagePreview && (
                <div className="flex items-center gap-2 flex-col">
                  <img
                    className="rounded-md object-cover w-[100%] h-[20rem]"
                    src={imagePreview}
                    alt="user"
                  />
                  <button
                    className="text-red-500"
                    onClick={() => {
                      setPostImage("");
                      setImagePreview("");
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="flex text-gray-500 justify-around">
              <button
                className="flex text-[0.85rem] px-2 py-1 rounded-md items-center gap-x-2 "
                onClick={openFileInput}
              >
                <ImImage />
                <p>Image</p>
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
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
                <button
                  className="bg-blue-600 text-white rounded-2xl px-4 py-1 text-[0.85rem]"
                  onClick={setPostHandler}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Post Area End */}

        {/* List of All Post */}
        {posts.map((item, index) => {
          return (
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
                      <span className="text-[0.75rem]">
                        {creationTime(item.date)}
                      </span>
                    </div>
                  </div>
                  <div className="relative inline-block">
                    <button
                      onClick={() => {
                        toggleDropdown(item.id);
                      }}
                      className=" text-black py-2 px-4 rounded focus:outline-none"
                    >
                      <BsThreeDots />
                    </button>
                    {isDropdownVisible === item.id && (
                      <div className="dropdown-content absolute bg-white font-semibold border rounded shadow-md right-3 top-[25px] min-w-[80px]">
                        <p
                          className="p-2 hover:bg-gray-100 cursor-pointer text-xs "
                          onClick={() => deletePost(item.id)}
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
              <div className="pt-2">
                <div>
                  <p key={item.index}>{item.text}</p>
                </div>
                {item.imageURL && (
                  <div>
                    <img
                      className="w-full h-[25rem] rounded-md object-cover mt-4"
                      src={item.imageURL}
                      alt="post"
                    />
                  </div>
                )}
              </div>
              <div className="flex mt-5 justify-between px-4 text-gray-600">
                <button
                  onClick={() => {
                    handleLikeClick(item.id);
                  }}
                >
                  {item.liked ? (
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
                    handleBookmarkClick(item.id);
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
          );
        })}
      </section>
    </>
  );
};

export default Feed;
