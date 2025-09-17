import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineCameraEnhance } from "react-icons/md";
import { useAuth } from "../../contexts/auth/AuthProvider";
import { useFetch } from "../../services/useFetch";
import { Toast } from "../../services/Toast";
import { useUser } from "../../contexts/user/UserProvider";

const ProfilePage = ({ isOpen, onClose }) => {
  const filePickerRef = useRef();
  const { userAuthState, updateUserToken, isLoading, logoutHandler } =
    useAuth();
                 
  const {userState, isUserloading} = useUser();
  

  const initialUserData = {
    apiURL: "",
    method: "GET",
    postMethodData: null,
    encodedToken: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null); // file object
  const [preview, setPreview] = useState(null); // preview url

  const { apiURL, method, postMethodData, encodedToken } = userData;

  const { serverResponse, error } = useFetch(
    apiURL,
    method,
    postMethodData,
    encodedToken
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // for preview only
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Build formData for multer
    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    if (image) formData.append("file", image);

    setUserData((prev) => {
      return {
        ...prev,
        apiURL: `/api/users/${userState._id}`,
        method: "PATCH",
        postMethodData: formData,
        encodedToken: userAuthState.encodedToken,
      };
    });
  };

  // watch for response
  useEffect(() => {
    
    
    if (serverResponse?.data?.encodedToken) {
      console.log(serverResponse.data.bio);

      updateUserToken(serverResponse.data.encodedToken);
      if (serverResponse.data.user?.profilePicture) {
        setPreview(serverResponse.data.user.profilePicture);
        setImage(null);
      }
      if (serverResponse.data.user?.username) {
        setUsername(serverResponse.data.user.username);
      }
      if (serverResponse.data.user?.bio) {
        setBio(serverResponse.data.user.bio);
        
      }
      onClose();
      Toast({
        type: "success",
        msg: "User info updated!",
      });
    }
  }, [serverResponse]);

  const closeModalHandler = () => {
    setUsername(userState.username);
    setBio(userState.bio);
    setImage(null);
    onClose();
  };

  useEffect(() => {
    if (userState && isLoading === false) {
      setUsername(userState.username);
      setBio(userState.bio);
      if (!preview) {
        setPreview(userState.profilePicture);
      }
    }
  }, [userState, isLoading, isOpen]);

  return (
    <div
      className={`fixed bg-transparent items-center w-[100%] h-[100%] left-0 bottom-0 flex justify-center
       ${isOpen ? "visible" : "hidden"}`}
    >
      <div className="absolute justify-center items-center bg-red-100 h-[500px] min-w-[500px] rounded-xl opacity-100">
        <div className="flex p-[20px] justify-between">
          <IoMdClose
            size={20}
            style={{
              width: "20px",
              height: "20px",
              color: "black",
              cursor: "pointer",
            }}
            onClick={closeModalHandler}
          />
          <p className=" text-black">Edit Profile</p>
          <button
            className="bg-blue-600 text-white rounded-2xl px-4 py-1 text-[0.85rem]"
            onClick={submitHandler}
          >
            Save
          </button>
        </div>
        <div
          className="flex justify-center onHover:bg-gray-100 p-[20px] rounded-xl"
          onClick={() => filePickerRef.current.click()}
        >
          <div
            className="w-[100px] h-[100px] rounded-full object-cover bg-gray-500 flex justify-center items-center cursor-pointer"
            style={{
              backgroundImage: `url(${preview})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="w-[40px] h-[40px] rounded-full object-cover bg-gray-700 flex justify-center items-center opacity-80">
              <MdOutlineCameraEnhance size={20} />
              <input
                type="file"
                id="file"
                className="hidden"
                accept="image/*"
                ref={filePickerRef}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col text-black bg-slate-200 border-black mx-10 p-2">
          <div className="font-bold">Name</div>
          <textarea
            className="h-[30px] resize-none outline-none text-md bg-slate-200 text-gray-800"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></textarea>
        </div>
        <div className="flex flex-col text-black bg-slate-200 border-black mx-10 mt-2 p-2">
          <div className="font-bold">Bio</div>
          <textarea
            className="h-[30px] resize-none outline-none text-md bg-slate-200 text-gray-800"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          ></textarea>
        </div>
        <button
          className=" flex bg-blue-600 text-white rounded-2xl px-4 py-2 text-[0.85rem] mx-auto mt-[3rem]"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
