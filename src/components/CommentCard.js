import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  MoreHorizontal,
} from "lucide-react";

const CommentCard = ({
  index,
  comment,
  userId,
  creationTime,
  likeComment,
  bookmarkedPost,
  bookmarkPost,
}) => {
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
          <span className="text-sm">{comment.comments || 0}</span>
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
    </div>
  );
};

export default CommentCard;
