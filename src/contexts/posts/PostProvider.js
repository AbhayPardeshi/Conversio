import {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import postReducer from "./postReducer";
import { useFetch } from "../../services/useFetch";
import { Toast } from "../../services/Toast";

const initialState = {
  apiURL: "",
  method: "GET",
  postMethodData: {},
};
const PostContext = createContext(initialState);
export const usePost = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postState, postDispatch] = useReducer(postReducer, initialState);
  const { serverResponse, isLoading, error } = useFetch(
    postState.apiURL,
    postState.method,
    postState.postMethodData
  );

  useEffect(() => {
    postDispatch({ type: "GET_POSTS" });
  }, []);

  // useEffect(() => {
  //   if (serverResponse) {
  //     // Update posts only if the server response is successful
  //     if (serverResponse.status === 200) {
  //       setPosts(serverResponse.data.posts);
  //     } else if (serverResponse && serverResponse.status === 201) {
  //       setPosts((prevPosts) => [...prevPosts, serverResponse.data]);
  //     }else if (serverResponse && serverResponse.status === 202) {
  //       setPosts((prevPosts) => prevPosts.filter((post) => post.id !== serverResponse.data.id));
  //     }
  //     else {
  //       console.error("Failed to fetch posts:", serverResponse.status);
  //     }
  //   }
  // }, [serverResponse]);

  useEffect(() => {
    if (serverResponse) {
      const handleResponse = () => {
        const { action, posts, id, savedPost } = serverResponse.data;
        switch (action) {
          case "getPosts":
            setPosts(posts);
            break;
          case "createPost":
            setPosts((prevPosts) => [...prevPosts, savedPost]);
            Toast({ type: "success", msg: "post created successfully" });
            break;
          case "deletePost":
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            break;
          default:
            console.error("Unknown action:", action);
        }
      };

      handleResponse();
    }
  }, [serverResponse]);

  const sendData = async (data) => {
    postDispatch({
      type: "POST",
      payload:data ,
    });
  };

  const deletePost = (id) => {
    postDispatch({ type: "DELETE_ONE_POST", payload: id });
  };
  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        sendData,
        serverResponse,
        deletePost,
        postDispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
