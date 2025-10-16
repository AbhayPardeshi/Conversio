import { useState, useRef, useCallback } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { usePost } from "../contexts/posts/PostProvider";
import { useAuth } from "../contexts/auth/AuthProvider";
import creationTime from "../utils/creationTime";
import { useUser } from "../contexts/user/UserProvider";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const { posts, deletePost, likePost, loadMorePosts, hasMore } = usePost();
  const { userAuthState, isLoading } = useAuth();
  const { userState, bookmarkPost } = useUser();
  const [isDropdownVisible, setIsDropdownVisible] = useState(null);
  const navigate = useNavigate();
  let userId = null;
  if (!isLoading) {
    userId = userAuthState?.user?.id;
  }

  // Toggle 3-dot dropdown
  const toggleDropdown = (postId) => {
    setIsDropdownVisible((prev) => (prev === postId ? null : postId));
  };

  // Infinite scroll observer
  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMorePosts]
  );

  return (
    <div className="bg-gray-100 rounded-md">
      <section className="w-full cursor-pointer">
        {posts.map((post, index) => (
          <div
            onClick={() => navigate(`/post/${post._id}`)}
            ref={index === posts.length - 1 ? lastPostRef : null}
            className="bg-white rounded-md p-5 mt-4"
            key={index}
          >
            {/* Post Header */}
            <div className="flex items-center gap-3">
              <img
                className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
                src={
                  post.user?.profilePicture
                    ? post.user.profilePicture
                    : "/default-avatar.png"
                }
                alt="user"
              />
              <div className="flex justify-between w-full">
                <div className="flex gap-4">
                  <div>
                    <span className="font-semibold">{post.user.username}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      @{post.user?.username?.toLowerCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">
                      {creationTime(post.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Dropdown */}
                <div className="relative inline-block">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDropdown(post._id);
                    }}
                    className="text-black py-2 px-4 rounded hover:bg-gray-100"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                  {isDropdownVisible === post._id && (
                    <div className="absolute bg-white font-semibold border rounded shadow-md right-3 top-[25px] min-w-[80px] z-10">
                      <p
                        className="p-2 hover:bg-gray-100 cursor-pointer text-xs"
                        onClick={(e) => {
                          e.stopPropagation(); // prevent navigation

                          deletePost(post._id);
                        }}
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
              <p className="text-gray-900">{post.text}</p>
              {post.media[0] && (
                <img
                  className="w-full h-[20rem] rounded-md object-cover mt-4"
                  src={`http://localhost:3001${post.media[0]}`}
                  alt="post"
                />
              )}
            </div>

            {/* Post Actions */}
            <div className="flex mt-5 justify-between px-4 text-gray-600 mx-12">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent navigation
                  likePost(post._id, userId);
                }}
                className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                  post.likes.includes(userId)
                    ? "text-red-500 bg-red-50 hover:bg-red-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <Heart
                  size={25}
                  className={post.likes.includes(userId) ? "fill-current" : ""}
                />
                <span className="text-sm">{post.likes.length}</span>
              </button>

              <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100">
                <MessageCircle size={25} />
                <span className="text-sm">{post.comments || 0}</span>
              </button>

              <button
                className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                  userState.bookmarkedPosts.includes(post._id)
                    ? "text-gray-500 bg-gray-50 hover:bg-gray-100"
                    : "hover:bg-gray-100"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  bookmarkPost(post._id, userId);
                }}
              >
                {userState.bookmarkedPosts.includes(post._id) ? (
                  <Bookmark size={25} fill="currentColor" /> // filled
                ) : (
                  <Bookmark size={25} /> // outline
                )}
              </button>

              <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100">
                <Share2 size={25} />
                <span className="text-sm">{post.shares || 0}</span>
              </button>
            </div>
          </div>
        ))}
      </section>
      {!hasMore && (
        <p className="text-center text-gray-500 py-4">No more posts</p>
      )}
    </div>
  );
};

export default Posts;
