import React, { useEffect, useState } from "react";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useUser } from "../contexts/user/UserProvider";
import { useFetch } from "../services/useFetch";
import { usePost } from "../contexts/posts/PostProvider";

const BookmarksPage = () => {
  const { userState, bookmarkPost } = useUser();
  const { likePost } = usePost();
  const [bookmarks, setBookmarks] = useState("");

  const userId = userState._id;

  const { serverResponse, isLoading, error } = useFetch(
    userId ? `/api/bookmark/${userId}` : null,
    "GET"
  );

  useEffect(() => {
    if (serverResponse) {
      const { action, bookmarkedPosts } = serverResponse.data;
      if (action === "userBookmarks") {
        setBookmarks(bookmarkedPosts);
      }
    }
  }, [serverResponse]);

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return postDate.toLocaleDateString();
  };

  const handleLikeClick = (postId) => {
    likePost(postId, userId); // call PostProvider to update backend

    // Optimistically update UI
    setBookmarks((prev) =>
      prev.map((post) =>
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

  const handleRemoveBookmark = (postId) => {
    bookmarkPost(postId, userId);
    setBookmarks((prev) => prev.filter((post) => post._id !== postId));
  };

  return (
    <div className="max-h-[calc(100vh-60px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bookmark className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookmarks</h1>
            <p className="text-gray-600">{bookmarks.length} saved posts</p>
          </div>
        </div>
      </div>

      {/* Bookmarks Feed */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className=" mx-auto p-4">
          {bookmarks.length === 0 ? (
            <div className="text-center py-12">
              <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-500">
                Posts you bookmark will appear here for easy access later.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarks.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-lg shadow-sm border"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.user.profilePicture}
                        alt={post.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">
                            {post.user.username}
                          </span>
                          <span className="text-gray-500 text-sm">
                            @{post.user.username}
                          </span>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-500 text-sm">
                            {formatTimeAgo(post.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
                        <MoreHorizontal className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 pb-3">
                    <p className="text-gray-900 leading-relaxed">{post.text}</p>

                    {post.media.length > 0 && (
                      <div className="mt-3">
                        <img
                          src={`http://localhost:3001${post.media}`}
                          alt="Post content"
                          className="w-full rounded-lg object-cover max-h-96"
                        />
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between px-4 py-3 border-t">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLikeClick(post._id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                          post.likes.includes(userId)
                            ? "text-red-500 bg-red-50 hover:bg-red-100"
                            : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            post.likes.includes(userId) ? "fill-current" : ""
                          }`}
                        />
                        <span className="text-sm font-medium">
                          {post.likes.length}
                        </span>
                      </button>

                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Reply</span>
                      </button>

                      <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-gray-500 hover:text-green-500 hover:bg-green-50 transition-colors">
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemoveBookmark(post._id)}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-blue-500 bg-blue-50 hover:bg-blue-100 transition-colors"
                      title="Remove from bookmarks"
                    >
                      <Bookmark className="w-5 h-5 fill-current" />
                      <span className="text-sm font-medium">Saved</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;
