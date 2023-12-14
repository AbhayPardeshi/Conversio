import { Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Toast = ({ type, msg }) => {
  return toast(msg, {
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: false,
    position: toast.POSITION.TOP_RIGHT,
    transition: Slide,
    type: type,
  });
};
