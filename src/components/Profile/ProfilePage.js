import React from "react";
import { IoMdClose } from "react-icons/io";
import { MdOutlineCameraEnhance } from "react-icons/md";
import { useRef } from "react";
const ProfilePage = ({ isOpen, onClose }) => {
  const filePickerRef = useRef();

  const [image, setImage] = React.useState(null);

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

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
            onClick={onClose}
          />
          <p className=" text-black">Edit Profile</p>
          <button className="bg-blue-600 text-white rounded-2xl px-4 py-1 text-[0.85rem]">
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
        <div className="flex flex-col text-black bg-slate-200 border-black m-2 p-2">
          <div className="font-bold">Name</div>
          <textarea className="h-[30px] resize-none outline-none text-md bg-slate-200 text-gray-800"></textarea>
        </div>
        <div className="flex flex-col text-black bg-slate-200 border-black m-2 p-2">
          <div className="font-bold">Bio</div>
          <textarea className="h-[30px] resize-none outline-none text-md bg-slate-200 text-gray-800"></textarea>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
