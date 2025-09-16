// import React, { useState, useRef, useEffect } from "react";
// import { ImImage } from "react-icons/im";
// import {
//   AiOutlineVideoCamera,
//   AiOutlineAudio,
//   AiOutlineHeart,
//   AiOutlineComment,
//   AiFillHeart,
// } from "react-icons/ai";
// import { FiBookmark, FiShare2 } from "react-icons/fi";
// import { IoMdAttach } from "react-icons/io";
// import { BsThreeDots } from "react-icons/bs";
// import { BsFillBookmarkFill } from "react-icons/bs";
// import { useFetch } from "../services/useFetch";
// import { usePost } from "../contexts/posts/PostProvider";
// import creationTime from "../utils/creationTime";
// import { useAuth } from "../contexts/auth/AuthProvider";

// const samplePostsData = [
//   {
//     _id: "post_001",
//     text: "Just finished building my first React Native app! 📱 The learning curve was steep but totally worth it. Can't wait to deploy it to the app store! 🚀",
//     imageURL: "/uploads/react-native-app.jpg",
//     date: "2024-01-20T14:30:00Z",
//     likes: ["user_001", "user_003", "user_007", "user_012"],
//     bookmarked: false,
//     user: {
//       _id: "user_005",
//       name: "Alex Chen",
//       username: "alexchen_dev",
//       avatar: "https://i.pravatar.cc/150?img=8",
//     },
//     comments: 12,
//     shares: 3,
//   },
//   {
//     _id: "post_002",
//     text: "Beautiful sunrise from my morning hike 🌅 Sometimes you just need to disconnect and enjoy nature's beauty. What's your favorite way to start the day?",
//     imageURL: "/uploads/sunrise-hike.jpg",
//     date: "2024-01-20T06:45:00Z",
//     likes: ["user_002", "user_004", "user_008", "user_011", "user_015"],
//     bookmarked: true,
//     user: {
//       _id: "user_003",
//       name: "Sarah Johnson",
//       username: "sarah_adventures",
//       avatar: "https://i.pravatar.cc/150?img=9",
//     },
//     comments: 8,
//     shares: 5,
//   },
//   {
//     _id: "post_003",
//     text: "Working on a new design system for our startup. Clean, minimal, and user-friendly. Here's a sneak peek at the component library! 🎨✨",
//     imageURL: "/uploads/design-system.jpg",
//     date: "2024-01-19T16:20:00Z",
//     likes: ["user_001", "user_006", "user_009"],
//     bookmarked: false,
//     user: {
//       _id: "user_007",
//       name: "Maria Rodriguez",
//       username: "maria_designs",
//       avatar: "https://i.pravatar.cc/150?img=10",
//     },
//     comments: 15,
//     shares: 7,
//   },
//   {
//     _id: "post_004",
//     text: "Coffee shop vibes ☕ Perfect spot for coding and getting things done. Their WiFi is fast and the atmosphere is just right for productivity!",
//     imageURL: null,
//     date: "2024-01-19T10:15:00Z",
//     likes: ["user_002", "user_005", "user_010"],
//     bookmarked: true,
//     user: {
//       _id: "user_001",
//       name: "John Smith",
//       username: "johnsmith_code",
//       avatar: "https://i.pravatar.cc/150?img=11",
//     },
//     comments: 4,
//     shares: 1,
//   },
//   {
//     _id: "post_005",
//     text: "Just deployed my first full-stack application! 🎉 Built with React, Node.js, Express, and MongoDB. The feeling when everything works perfectly is unmatched!",
//     imageURL: "/uploads/fullstack-app.jpg",
//     date: "2024-01-18T20:30:00Z",
//     likes: [
//       "user_003",
//       "user_004",
//       "user_006",
//       "user_008",
//       "user_013",
//       "user_014",
//     ],
//     bookmarked: false,
//     user: {
//       _id: "user_009",
//       name: "David Kim",
//       username: "david_fullstack",
//       avatar: "https://i.pravatar.cc/150?img=12",
//     },
//     comments: 23,
//     shares: 12,
//   },
//   {
//     _id: "post_006",
//     text: "Team lunch at the new Italian place downtown! 🍝 Nothing beats good food and great conversations with amazing colleagues. #TeamBuilding",
//     imageURL: "/uploads/team-lunch.jpg",
//     date: "2024-01-18T13:45:00Z",
//     likes: ["user_001", "user_007", "user_011"],
//     bookmarked: false,
//     user: {
//       _id: "user_004",
//       name: "Emily Watson",
//       username: "emily_pm",
//       avatar: "https://i.pravatar.cc/150?img=13",
//     },
//     comments: 7,
//     shares: 2,
//   },
//   {
//     _id: "post_007",
//     text: "Learning Python data science libraries has been an incredible journey! 📊 Pandas, NumPy, and Matplotlib are game-changers. Any recommendations for next steps?",
//     imageURL: null,
//     date: "2024-01-17T19:20:00Z",
//     likes: ["user_005", "user_009", "user_012", "user_015"],
//     bookmarked: true,
//     user: {
//       _id: "user_002",
//       name: "Lisa Chang",
//       username: "lisa_datascience",
//       avatar: "https://i.pravatar.cc/150?img=14",
//     },
//     comments: 18,
//     shares: 6,
//   },
//   {
//     _id: "post_008",
//     text: "Weekend project: Building a smart home automation system with Raspberry Pi! 🏠🤖 It can control lights, temperature, and security. Technology is amazing!",
//     imageURL: "/uploads/smart-home.jpg",
//     date: "2024-01-17T11:30:00Z",
//     likes: ["user_001", "user_003", "user_006", "user_010", "user_014"],
//     bookmarked: false,
//     user: {
//       _id: "user_008",
//       name: "Michael Brown",
//       username: "mike_iot",
//       avatar: "https://i.pravatar.cc/150?img=15",
//     },
//     comments: 11,
//     shares: 8,
//   },
//   {
//     _id: "post_009",
//     text: "Attended an amazing tech conference today! 🎤 So many inspiring talks about AI, blockchain, and the future of web development. Feeling motivated! #TechConf2024",
//     imageURL: "/uploads/tech-conference.jpg",
//     date: "2024-01-16T17:00:00Z",
//     likes: ["user_002", "user_004", "user_007", "user_011", "user_013"],
//     bookmarked: true,
//     user: {
//       _id: "user_006",
//       name: "Jennifer Lee",
//       username: "jen_techie",
//       avatar: "https://i.pravatar.cc/150?img=16",
//     },
//     comments: 14,
//     shares: 9,
//   },
//   {
//     _id: "post_010",
//     text: "Late night coding session 🌙💻 Working on optimizing database queries. Sometimes the best solutions come when the world is quiet.",
//     imageURL: null,
//     date: "2024-01-16T02:15:00Z",
//     likes: ["user_005", "user_008", "user_009"],
//     bookmarked: false,
//     user: {
//       _id: "user_010",
//       name: "Robert Wilson",
//       username: "rob_backend",
//       avatar: "https://i.pravatar.cc/150?img=17",
//     },
//     comments: 6,
//     shares: 3,
//   },
// ];

// const Post = ({ item, index }) => {
//   const [isDropdownVisible, setIsDropdownVisible] = useState(null);
//   const { setPosts, deletePost, dislikePost, likePost } = usePost();

//   const { userAuthState, isLoading } = useAuth();
//   let user = {};
//   if (!isLoading) {
//     user = userAuthState?.user._doc;
//   }
//   const userId = user._id;

//   const handleLikeClick = (postId) => {
//     if (!item.likes.includes(userId)) {
//       likePost(postId);
//     } else {
//       dislikePost(postId);
//     }
//   };

//   const handleBookmarkClick = (postId) => {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post._id === postId
//           ? {
//               ...post,
//               bookmarked: !post.bookmarked,
//             }
//           : post
//       )
//     );
//   };
//   const toggleDropdown = (postId) => {
//     setIsDropdownVisible((prevVisibleDropdown) =>
//       prevVisibleDropdown === postId ? null : postId
//     );
//   };

//   return (
//     <>
//       <div className="bg-white rounded-md p-5 justify-center mt-4 " key={index}>
//         <div className="flex mt-[0.40rem] items-center gap-3">
//           <img
//             className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
//             src="./assets/images/user2.jfif"
//             alt="user"
//           />
//           <div className="flex justify-between w-full align-top">
//             <div className="flex gap-4">
//               <div>
//                 <span>John Doe</span>
//                 <span className="text-[0.75rem] text-gray-500 ml-2">
//                   @JohnDoe
//                 </span>
//               </div>
//               <div>
//                 <span className="text-[0.75rem]">
//                   {creationTime(item.date)}
//                 </span>
//               </div>
//             </div>
//             <div className="relative inline-block">
//               <button
//                 onClick={() => {
//                   toggleDropdown(item._id);
//                 }}
//                 className=" text-black py-2 px-4 rounded focus:outline-none"
//               >
//                 <BsThreeDots />
//               </button>
//               {isDropdownVisible === item._id && (
//                 <div className="dropdown-content absolute bg-white font-semibold border rounded shadow-md right-3 top-[25px] min-w-[80px]">
//                   <p
//                     className="p-2 hover:bg-gray-100 cursor-pointer text-xs "
//                     onClick={() => deletePost(item._id)}
//                   >
//                     Delete Post
//                   </p>
//                   <p className="p-2 hover:bg-gray-100 cursor-pointer text-xs">
//                     Edit Post
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="pt-2 mx-12">
//           <div>
//             <p key={item.index}>{item.text}</p>
//           </div>
//           {item.imageURL && (
//             <div>
//               <img
//                 className="w-full h-[20rem] rounded-md object-cover mt-4"
//                 src={`http://localhost:3001${item.imageURL}`}
//                 alt="post"
//               />
//             </div>
//           )}
//         </div>
//         <div className="flex mt-5 justify-between px-4 text-gray-600 mx-12">
//           <button
//             onClick={() => {
//               handleLikeClick(item._id);
//             }}
//           >
//             {item.likes && item.likes.find((id) => id === userId) ? (
//               <AiFillHeart size={25} color="red" />
//             ) : (
//               <AiOutlineHeart size={25} />
//             )}
//           </button>
//           <button>
//             <AiOutlineComment size={25} />
//           </button>
//           <button
//             onClick={() => {
//               handleBookmarkClick(item._id);
//             }}
//           >
//             {item.bookmarked ? (
//               <BsFillBookmarkFill size={25} color="gray" />
//             ) : (
//               <FiBookmark size={25} />
//             )}
//           </button>

//           <button>
//             <FiShare2 size={25} />
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Post;



import { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { usePost } from "../contexts/posts/PostProvider";
import creationTime from "../utils/creationTime";

// Current user for demo
const currentUser = {
  _id: "user_001",
  name: "Current User",
  username: "current_user",
};

const Posts = ({ posts, setPosts, deletePost }) => {
  //const { posts, setPosts, deletePost, dislikePost, likePost } = usePost();
  //const [posts, setPosts] = useState(samplePostsData);
  const [isDropdownVisible, setIsDropdownVisible] = useState(null);
  const userId = currentUser._id;
  console.log();

  const handleLikeClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: post.likes.includes(userId)
                ? post.likes.filter((id) => id !== userId)
                : [...post.likes, userId],
            }
          : post
      )
    );
  };

  const handleBookmarkClick = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  const toggleDropdown = (postId) => {
    setIsDropdownVisible((prevVisible) =>
      prevVisible === postId ? null : postId
    );
  };

  // const deletePost = (postId) => {
  //   setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  //   setIsDropdownVisible(null);
  // };

  return (
    <div className="bg-gray-100 bg-white rounded-md justify-center ">
      {/* Posts Feed */}

      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <section className=" rounded-md w-full">
          {posts.map((post, index) => (
            <div
              className="bg-white rounded-md p-5 justify-center mt-4"
              key={index}
            >
              {/* Post Header */}
              <div className="flex mt-[0.40rem] items-center gap-3">
                <img
                  className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
                  src={post.user?.profilePicture}
                  alt="user"
                />
                <div className="flex justify-between w-full align-top">
                  <div className="flex gap-4">
                    <div>
                      <span className="font-semibold">
                        {post.user.username}
                      </span>
                      <span className="text-[0.75rem] text-gray-500 ml-2">
                        @{post.user?.username.toLowerCase().replace(/\s+/g, "")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[0.75rem] text-gray-500">
                        {creationTime(post.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  <div className="relative inline-block">
                    <button
                      onClick={() => toggleDropdown(post._id)}
                      className="text-black py-2 px-4 rounded focus:outline-none hover:bg-gray-100"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                    {isDropdownVisible === post._id && (
                      <div className="dropdown-content absolute bg-white font-semibold border rounded shadow-md right-3 top-[25px] min-w-[80px] z-10">
                        <p
                          className="p-2 hover:bg-gray-100 cursor-pointer text-xs"
                          onClick={() => deletePost(post._id)}
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

              {/* Post Content */}
              <div className="pt-2 mx-12">
                <div>
                  <p className="text-gray-900 leading-relaxed">{post.text}</p>
                </div>
                {post.media[0] && (
                  <div>
                    <img
                      className="w-full h-[20rem] rounded-md object-cover mt-4"
                      src={`http://localhost:3001${post.media[0]}`}
                      alt="post"
                    />
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="flex mt-5 justify-between px-4 text-gray-600 mx-12">
                <button
                  onClick={() => handleLikeClick(post._id)}
                  className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                    post.likes.includes(userId)
                      ? "text-red-500 bg-red-50 hover:bg-red-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Heart
                    size={25}
                    className={
                      post.likes.includes(userId) ? "fill-current" : ""
                    }
                  />
                  <span className="text-sm">{post.likes.length}</span>
                </button>

                <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <MessageCircle size={25} />
                  <span className="text-sm">{post.comments}</span>
                </button>

                <button
                  onClick={() => handleBookmarkClick(post._id)}
                  className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                    post.bookmarked
                      ? "text-blue-500 bg-blue-50 hover:bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Bookmark
                    size={25}
                    className={post.bookmarked ? "fill-current" : ""}
                  />
                </button>

                <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Share2 size={25} />
                  <span className="text-sm">{post.shares}</span>
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Posts;