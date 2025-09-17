import React, { useState } from "react";
import {
  Bookmark,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useUser } from "../contexts/user/UserProvider";
import { usePost } from "../contexts/posts/PostProvider";



// Mock data for bookmarked posts
const bookmarkedPostsData = [
  {
    _id: "1",
    text: "Just finished reading an amazing book about React patterns. The way they explain hooks and context is incredible! 📚✨",
    imageURL: null,
    date: "2024-01-15T10:30:00Z",
    likes: ["user1", "user2", "user3"],
    bookmarked: true,
    user: {
      name: "Lauren Wilson",
      username: "laurenwilson",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    _id: "2",
    text: "Beautiful sunset from my hiking trip last weekend. Nature never fails to amaze me! 🌅",
    imageURL: "/api/placeholder/500/400",
    date: "2024-01-14T18:45:00Z",
    likes: ["user1", "user4", "user5"],
    bookmarked: true,
    user: {
      name: "Kelly Tran",
      username: "kellytran",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  },
  {
    _id: "3",
    text: "Working on a new design system for our team. The component library is coming together nicely! 🎨",
    imageURL: null,
    date: "2024-01-13T14:20:00Z",
    likes: ["user1", "user6"],
    bookmarked: true,
    user: {
      name: "Janice Contreras",
      username: "janicecontreras",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  },
  {
    _id: "4",
    text: "Coffee and code - the perfect combination for a productive morning ☕💻",
    imageURL: "/api/placeholder/500/300",
    date: "2024-01-12T09:15:00Z",
    likes: ["user1", "user2", "user7", "user8"],
    bookmarked: true,
    user: {
      name: "Linda Sullivan",
      username: "lindasullivan",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  },
  {
    _id: "5",
    text: "Excited to share my latest project! Built a full-stack application with React and Node.js. The learning journey continues! 🚀",
    imageURL: null,
    date: "2024-01-11T16:30:00Z",
    likes: ["user1", "user9"],
    bookmarked: true,
    user: {
      name: "Joan Jones",
      username: "joanjones",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  },
];

const BookmarksPage = () => {
  const { userState } = useUser();
  const {posts} = usePost();
  const [bookmarks, setBookmarks] = useState(bookmarkedPostsData);
  
  const [currentUserId] = useState("user1"); // Mock current user ID

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

  const handleRemoveBookmark = (postId) => {
    setBookmarks((prev) => prev.filter((post) => post._id !== postId));
  };

  const handleLikeClick = (postId) => {
    setBookmarks((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: post.likes.includes(currentUserId)
                ? post.likes.filter((id) => id !== currentUserId)
                : [...post.likes, currentUserId],
            }
          : post
      )
    );
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
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">
                            {post.user.name}
                          </span>
                          <span className="text-gray-500 text-sm">
                            @{post.user.username}
                          </span>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-500 text-sm">
                            {formatTimeAgo(post.date)}
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

                    {post.imageURL && (
                      <div className="mt-3">
                        <img
                          src={`https://picsum.photos/500/400?random=${post._id}`}
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
                          post.likes.includes(currentUserId)
                            ? "text-red-500 bg-red-50 hover:bg-red-100"
                            : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            post.likes.includes(currentUserId)
                              ? "fill-current"
                              : ""
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
