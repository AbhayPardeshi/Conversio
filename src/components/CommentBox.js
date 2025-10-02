// import { useState, useRef, useEffect } from "react";
// import { useFetch } from "../services/useFetch";

// const CommentBox = ({ user, postId, onNewComment }) => {
//   const [commentText, setCommentText] = useState("");
//   const [imagePreview, setImagePreview] = useState("");
//   const [file, setFile] = useState(null);
//   const [isFocused, setIsFocused] = useState(false); // track focus
//   const fileInputRef = useRef(null);

//   const [commentData, setCommentData] = useState(null);

//   const { serverResponse, isLoading, error } = useFetch(
//     commentData?.apiURL,
//     commentData?.method,
//     commentData?.postMethodData
//   );

//   const handleImageUpload = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setImagePreview(URL.createObjectURL(selectedFile));
//       setIsFocused(true);
//     }
//   };

//   const openFileInput = () => fileInputRef.current.click();

//   const handleAddComment = () => {
//     if (!commentText.trim() && !file) return;

//     const formData = new FormData();
//     formData.append("userId", user.id);
//     formData.append("postId", postId);
//     formData.append("text", commentText);
//     if (file) formData.append("file", file);

//     setCommentData({
//       apiURL: `/api/posts/${postId}/comments`,
//       method: "POST",
//       postMethodData: formData,
//       isFile: true,
//     });

//     setCommentText("");
//     setImagePreview("");
//     setFile(null);
//     setIsFocused(false);
//   };

//   useEffect(() => {
//     if (serverResponse?.data?.comment) {
//       onNewComment(serverResponse.data.comment);
//     }
//   }, [serverResponse]);

//   return (
//     <div className="bg-white rounded-md mt-4 p-3">
//       <div className="flex gap-3">
//         {/* Profile Picture */}
//         <img
//           className="w-10 h-10 rounded-full object-cover"
//           src={user?.profilePicture || "/default-avatar.png"}
//           alt="user"
//         />

//         {/* Textarea */}
//         <textarea
//           rows={1}
//           placeholder="Reply..."
//           value={commentText}
//           onChange={(e) => setCommentText(e.target.value)}
//           onFocus={() => setIsFocused(true)}
//           className="outline-none text-sm bg-[#f5f7fb] flex-1 p-2 rounded-2xl resize-none"
//         />
//       </div>

//       {/* Image Upload + Reply buttons */}
//       {(isFocused || imagePreview) && (
//         <div className="flex justify-between items-center mt-2 gap-2">
//           <div className="flex gap-2">
//             <button
//               className="flex text-sm px-2 py-1 rounded-md items-center gap-1 hover:bg-gray-100"
//               onClick={openFileInput}
//             >
//               📷 Image
//             </button>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               ref={fileInputRef}
//               style={{ display: "none" }}
//             />
//           </div>

//           <button
//             onClick={handleAddComment}
//             className="bg-blue-600 text-white rounded-2xl px-4 py-1 text-sm hover:bg-blue-700"
//           >
//             Reply
//           </button>
//         </div>
//       )}

//       {/* Image preview */}
//       {imagePreview && (
//         <div className="mt-2">
//           <img
//             src={imagePreview}
//             alt="preview"
//             className="w-full h-[12rem] object-cover rounded-md"
//           />
//           <button
//             className="text-red-500 text-xs mt-1"
//             onClick={() => {
//               setImagePreview("");
//               setFile(null);
//             }}
//           >
//             Remove
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommentBox;
import { ImImage } from "react-icons/im";
import { AiOutlineVideoCamera, AiOutlineAudio } from "react-icons/ai";
import { IoMdAttach } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { useFetch } from "../services/useFetch";

const CommentBox = ({ user, postId, onNewComment }) => {
  const [commentText, setCommentText] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [file, setFile] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // track focus
  const fileInputRef = useRef(null);

  const [commentData, setCommentData] = useState(null);

  const { serverResponse, isLoading, error } = useFetch(
    commentData?.apiURL,
    commentData?.method,
    commentData?.postMethodData
  );

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setIsFocused(true);
    }
  };

  const openFileInput = () => fileInputRef.current.click();

  const handleAddComment = () => {
    if (!commentText.trim() && !file) return;

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("postId", postId);
    formData.append("text", commentText);
    if (file) formData.append("file", file);

    setCommentData({
      apiURL: `/api/posts/${postId}/comments`,
      method: "POST",
      postMethodData: formData,
      isFile: true,
    });

    setCommentText("");
    setImagePreview("");
    setFile(null);
    setIsFocused(false);
  };

  useEffect(() => {
    if (serverResponse?.data?.comment) {
      onNewComment(serverResponse.data.comment);
    }
  }, [serverResponse]);

  return (
    <div className="bg-white rounded-md p-3 flex flex-col gap-2">
      <div className="flex items-start gap-3">
        <img
          src={user?.profilePicture || "/default-avatar.png"}
          alt="user"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 flex flex-col">
          <textarea
            rows={1}
            placeholder="Reply..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="resize-none w-full rounded-2xl p-2 text-sm bg-[#f5f7fb] focus:outline-none"
          />
          {/* Toolbar shown only on focus */}
          {isFocused && (
            <div className="flex flex-wrap items-center justify-between text-gray-500 gap-2 mt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  className="flex items-center gap-1 px-3 py-1 text-[0.85rem] rounded-md hover:bg-gray-100 transition"
                  onClick={openFileInput}
                >
                  <ImImage />
                  <p>Image</p>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <button className="flex items-center gap-1 px-3 py-1 text-[0.85rem] rounded-md hover:bg-gray-100 transition">
                  <AiOutlineVideoCamera />
                  <p>Video/Gif</p>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-[0.85rem] rounded-md hover:bg-gray-100 transition">
                  <IoMdAttach />
                  <p>Attachments</p>
                </button>
                <button className="flex items-center gap-1 px-3 py-1 text-[0.85rem] rounded-md hover:bg-gray-100 transition">
                  <AiOutlineAudio />
                  <p>Audio</p>
                </button>
              </div>
              <div>
                <button
                  className="bg-blue-600 text-white px-5 py-1 rounded-2xl text-[0.85rem] hover:bg-blue-700 transition"
                  onClick={handleAddComment}
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {imagePreview && (
        <div className="mt-2 flex flex-col items-start">
          <img
            src={imagePreview}
            alt="preview"
            className="w-full h-[12rem] object-cover rounded-md"
          />
          <button
            className="text-red-500 text-xs mt-1"
            onClick={() => {
              setImagePreview("");
              setFile(null);
            }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentBox;
