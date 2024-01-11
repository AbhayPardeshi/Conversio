import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineCameraEnhance } from "react-icons/md";
import { useRef } from "react";
import { useAuth } from "../../contexts/auth/AuthProvider";
import { useFetch } from "../../services/useFetch";
import { Toast } from "../../services/Toast";
const ProfilePage = ({ isOpen, onClose }) => {
  const filePickerRef = useRef();
  const { userAuthState, updateUserToken, isLoading, logoutHandler } =
    useAuth();
  let user = {};
  if (userAuthState.isUserLoggedIn) {
    user = userAuthState.user._doc;
  }
  const initialUserData = {
    apiURL: "",
    method: "GET",
    postMethodData: {},
    encodedToken: "",
  };

  const [userData, setUserData] = useState(initialUserData);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(null);
  const { apiURL, method, postMethodData, encodedToken } = userData;

  const { serverResponse, error } = useFetch(
    apiURL,
    method,
    postMethodData,
    encodedToken
  );

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = { name, bio, image, userEmail: user.email };

    if (data) {
      setUserData((prev) => {
        return {
          ...prev,
          apiURL: "/user",
          method: "POST",
          postMethodData: { ...data },
        };
      });
    }
    const response = await serverResponse?.data?.encodedToken;
    if (response) {
      console.log("hello");
      updateUserToken(serverResponse.data.encodedToken);
      onClose();

      Toast({
        type: "success",
        msg: "User info updated!",
      });
    }
  };

  const closeModalHandler = () => {
    setName(user.name);
    setBio(user.bio);

    onClose();
  };

  useEffect(() => {
    if (user && user.name && user.bio) {
      setName(user.name);
      setBio(user.bio);
      setImage(user.bioImageURL);
    }
  }, [user]);
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
          className="flex justify-center 
        onHover:bg-gray-100 p-[20px] rounded-xl
        "
          onClick={() => filePickerRef.current.click()}
        >
          <div
            className="w-[100px] h-[100px] rounded-full object-cover bg-gray-500 flex justify-center items-center cursor-pointer"
            style={{
              backgroundImage: `url(${image})`,
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
            onChange={(e) => setName(e.target.value)}
            value={name}
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
