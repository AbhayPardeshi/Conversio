import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";

const CommentCard = ({
  index,
  comment,
  userId,
  creationTime,
  likeComment,
  bookmarkedPost,
  bookmarkPost,
  postId,
  onReplySuccess,
  repliesCount = 0,
  onToggleReplies,
  showReplies = false,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = async () => {
    if (!replyText.trim() || !userId) return;
    try {
      setIsSubmitting(true);
      await axios.post(`http://localhost:3001/api/posts/${postId}/comments`, {
        userId,
        text: replyText,
        parentPostId: comment._id,
      });
      setReplyText("");
      setShowReply(false);
      onReplySuccess?.();
    } catch (err) {
      console.error("Failed to reply to comment", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-md p-5 mt-4" key={index}>
      <div className="flex items-center gap-3">
        <img
          className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
          src={comment.user?.profilePicture || "/default-avatar.png"}
          alt="user"
        />
        <div className="flex justify-between w-full">
          <div className="flex gap-4">
            <div>
              <span className="font-semibold">{comment.user?.username}</span>
              <span className="text-sm text-gray-500 ml-2">
                @{comment.user?.username?.toLowerCase()}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-500">
                {creationTime(comment.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comment text */}
      <div className="pt-2 mx-12">
        <p className="text-gray-900">{comment.text}</p>
        {comment.media && comment.media[0] && (
          <img
            className="w-full h-[20rem] rounded-md object-cover mt-4"
            src={`http://localhost:3001${comment.media[0]}`}
            alt="comment media"
          />
        )}
      </div>

      {/* Actions like post */}
      <div className="flex mt-5 justify-between px-4 text-gray-600 mx-12">
        <button
          onClick={() => likeComment(comment._id, userId)}
          className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
            comment.likes.includes(userId)
              ? "text-red-500 bg-red-50 hover:bg-red-100"
              : "hover:bg-gray-100"
          }`}
        >
          <Heart
            size={25}
            className={comment.likes.includes(userId) ? "fill-current" : ""}
          />
          <span className="text-sm">{comment.likes.length}</span>
        </button>

        <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100">
          <MessageCircle size={25} />
          <span className="text-sm">{repliesCount}</span>
        </button>

        <button
          className={`flex items-center gap-2 p-2 rounded-full transition-colors ${
            bookmarkedPost.includes(comment._id)
              ? "text-gray-500 bg-gray-50 hover:bg-gray-100"
              : "hover:bg-gray-100"
          }`}
          onClick={() => bookmarkPost(comment._id, userId)}
        >
          {bookmarkedPost.includes(comment._id) ? (
            <Bookmark size={25} fill="currentColor" /> // filled
          ) : (
            <Bookmark size={25} /> // outline
          )}
        </button>

        <button className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100">
          <Share2 size={25} />
          <span className="text-sm">{comment.shares || 0}</span>
        </button>
      </div>

      <div className="mx-12 mt-2">
        <button
          onClick={() => setShowReply((prev) => !prev)}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Reply
        </button>
        {repliesCount > 0 && (
          <button
            onClick={onToggleReplies}
            className="ml-4 text-sm text-gray-600 hover:text-gray-900"
          >
            {showReplies ? "Hide replies" : `View replies (${repliesCount})`}
          </button>
        )}
        {showReply && (
          <div className="mt-2 flex items-center gap-2">
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handleReply}
              disabled={isSubmitting}
              className="px-3 py-2 rounded-full bg-blue-600 text-white text-sm"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
