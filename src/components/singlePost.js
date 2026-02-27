import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { usePost } from "../contexts/posts/PostProvider";
import { useAuth } from "../contexts/auth/AuthProvider";
import { useUser } from "../contexts/user/UserProvider";
import CommentCard from "./CommentCard";
import creationTime from "../utils/creationTime";
import axios from "axios";
import CommentBox from "./CommentBox";

const CommentThread = ({
  comment,
  depth,
  index,
  userId,
  likeComment,
  creationTime,
  bookmarkedPost,
  bookmarkPost,
  postId,
  onReplySuccess,
}) => {
  const shouldCollapse = depth >= 2 && comment.replies?.length > 0;

  const [showReplies, setShowReplies] = useState(false);
  return (
    <div className={`${depth > 0 ? "ml-6" : ""}`}>
      <CommentCard
        index={index}
        comment={comment}
        userId={userId}
        likeComment={likeComment}
        creationTime={creationTime}
        bookmarkedPost={bookmarkedPost}
        bookmarkPost={bookmarkPost}
        postId={postId}
        onReplySuccess={onReplySuccess}
        repliesCount={comment.replies?.length || 0}
        onToggleReplies={() => setShowReplies((prev) => !prev)}
        showReplies={showReplies}
      />
      {comment.replies?.length > 0 && showReplies && !shouldCollapse && (
        <div className="mt-2">
          {comment.replies.map((reply, replyIndex) => (
            <CommentThread
              key={reply._id}
              comment={reply}
              depth={depth + 1}
              index={replyIndex}
              userId={userId}
              likeComment={likeComment}
              creationTime={creationTime}
              bookmarkedPost={bookmarkedPost}
              bookmarkPost={bookmarkPost}
              postId={postId}
              onReplySuccess={onReplySuccess}
            />
          ))}
        </div>
      )}
      {comment.replies?.length > 0 && showReplies && shouldCollapse && (
        <details className="ml-6 mt-2 text-sm text-gray-500" open>
          <summary>Hide replies</summary>
          <div className="mt-2">
            {comment.replies.map((reply, replyIndex) => (
              <CommentThread
                key={reply._id}
                comment={reply}
                depth={depth + 1}
                index={replyIndex}
                userId={userId}
                likeComment={likeComment}
                creationTime={creationTime}
                bookmarkedPost={bookmarkedPost}
                bookmarkPost={bookmarkPost}
                postId={postId}
                onReplySuccess={onReplySuccess}
              />
            ))}
          </div>
        </details>
      )}
    </div>
  );
};

const SinglePost = () => {
  const { postId } = useParams(); // postId from route
  const { likePost, deletePost, posts } = usePost();
  const { userAuthState } = useAuth();
  const { userState, bookmarkPost } = useUser();
  const [allComments, setAllComments] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const userId = userAuthState?.user?.id;

  const post = posts.find((p) => p._id === postId);
  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:3001/api/posts/${postId}/comments`
    );
    setAllComments(res.data.comments || []);
  };

  // Fetch post comments
  useEffect(() => {
    fetchComments();
  }, [postId]);

  const buildCommentTree = (comments, rootId) => {
    const map = new Map();
    comments.forEach((c) => {
      map.set(c._id, { ...c, replies: [] });
    });

    const roots = [];
    map.forEach((node) => {
      if (String(node.parentPost) === String(rootId)) {
        roots.push(node);
      } else if (map.has(String(node.parentPost))) {
        map.get(String(node.parentPost)).replies.push(node);
      }
    });

    return roots;
  };

  const commentTree = useMemo(
    () => buildCommentTree(allComments, postId),
    [allComments, postId]
  );
  const topLevelCount = commentTree.length;

  // Toggle dropdown
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  // Add comment
  const handleAddComment = () => {
    fetchComments();
  };

  if (!post) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="overflow-y-auto flex-1 px-4">
      <div className="bg-gray-100 rounded-md">
        {/* Single Post */}
        <div className="bg-white rounded-md p-5 mt-4">
          {/* Post Header */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (post?.user?._id || post?.user?.id) {
                  navigate(`/profile/${post.user._id || post.user.id}`);
                }
              }}
              className="shrink-0"
            >
              <img
                className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
                src={post.user?.profilePicture || "/default-avatar.png"}
                alt="user"
              />
            </button>
            <div className="flex justify-between w-full">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (post?.user?._id || post?.user?.id) {
                      navigate(`/profile/${post.user._id || post.user.id}`);
                    }
                  }}
                  className="text-left"
                >
                  <span className="font-semibold">{post.user.username}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    @{post.user?.username?.toLowerCase()}
                  </span>
                </button>
                <div>
                  <span className="text-xs text-gray-500">
                    {creationTime(post.createdAt)}
                  </span>
                </div>
              </div>

              {/* Dropdown */}
              <div className="relative inline-block">
                <button
                  onClick={toggleDropdown}
                  className="text-black py-2 px-4 rounded hover:bg-gray-100"
                >
                  <MoreHorizontal size={20} />
                </button>
                {isDropdownVisible && (
                  <div className="absolute bg-white font-semibold border rounded shadow-md right-3 top-[25px] min-w-[80px] z-10">
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
              onClick={() => likePost(post._id, userId)}
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
              <span className="text-sm">{topLevelCount}</span>
            </button>

            <button
              className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
                userState.bookmarkedPosts.includes(post._id)
                  ? "text-gray-500 bg-gray-50 hover:bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => bookmarkPost(post._id, userId)}
            >
              {userState.bookmarkedPosts.includes(post._id) ? (
                <Bookmark size={25} fill="currentColor" />
              ) : (
                <Bookmark size={25} />
              )}
            </button>

            <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100">
              <Share2 size={25} />
              <span className="text-sm">{post.shares || 0}</span>
            </button>
          </div>
        </div>
        {/* Comment Input */}
        <CommentBox
          user={userAuthState?.user}
          postId={post._id}
          onNewComment={handleAddComment}
        />
        {/* Comments List */}
        <div className="mt-2">
          {topLevelCount === 0 && (
            <p className="text-center text-gray-500 mt-4">No comments yet</p>
          )}

          <div className="mt-2">
            <p className="text-gray-600 font-semibold mb-2 ml-2">
              Comments ({topLevelCount})
            </p>
            {commentTree.map((comment, index) => (
              <CommentThread
                key={comment._id}
                comment={comment}
                depth={0}
                index={index}
                userId={userAuthState?.user?.id}
                likeComment={likePost}
                creationTime={creationTime}
                bookmarkedPost={userState.bookmarkedPosts}
                bookmarkPost={bookmarkPost}
                postId={postId}
                onReplySuccess={fetchComments}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
