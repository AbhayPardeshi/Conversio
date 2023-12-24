import { ToastContainer } from "react-toastify";
import { Toast } from "../services/Toast";

const Example = () => {
  return (
    <>
      <button onClick={() => Toast({ type: "success", msg: "hello" })}>
        Hello
      </button>
      <ToastContainer />
    </>
  );
};

export default Example;
