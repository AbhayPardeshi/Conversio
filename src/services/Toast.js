import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = ({ type, msg }) => {
  console.log(msg);
  return toast(msg, {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    type: type,
  });
  //  toast(msg, {
  //   autoClose: 2000,
  //   closeOnClick: true,
  //   pauseOnHover: false,
  //   position: toast.POSITION.TOP_RIGHT,
  //   transition: Slide,
  //   type: type,
  // });
};
