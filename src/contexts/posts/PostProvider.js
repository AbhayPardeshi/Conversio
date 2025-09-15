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
import { useAuth } from "../auth/AuthProvider";

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
  const { userAuthState, isLoading } = useAuth();
  let user = {};
  if (!isLoading) {
    user = userAuthState?.user._id;
  }
  const { serverResponse, error } = useFetch(
    postState.apiURL,
    postState.method,
    postState.postMethodData
  );

  useEffect(() => {
    if (!isLoading && userAuthState?.isUserLoggedIn) {
      postDispatch({ type: "GET_POSTS" });
    }
  }, [isLoading, userAuthState]);

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
        const { action, posts, savedPost } = serverResponse.data;
        console.log(savedPost);
        
        switch (action) {
          case "feedPosts":
            setPosts(posts);
            break;
          case "postAdded":
            setPosts((prevPosts) => [savedPost, ...prevPosts]); // Add new post to beginning
            postDispatch({ type: "GET_POSTS" });
            Toast({ type: "success", msg: "post created successfully" });
            break;
          case "deletePost":
            // setPosts((prevPosts) =>
            //   prevPosts.filter((post) => post._id !== id)
            // );
            break;

          case "like":
            setPosts(posts);
            Toast({ type: "success", msg: "post liked successfully" });

            break;

          case "dislike":
            setPosts(posts);
            Toast({ type: "success", msg: "post disliked successfully" });

            break;

          default:
            console.error("Unknown action:", action);
        }
      };

      handleResponse();
    }
  }, [serverResponse]);

  const addPost = async (data) => {
    postDispatch({
      type: "ADD_POST",
      payload: data,
    });
  };

  const deletePost = (id) => {
    postDispatch({ type: "DELETE_ONE_POST", payload: id });
  };

  const likePost = (id) => {
    console.log(user._id);
    postDispatch({ type: "LIKE_POST", payload: { id: id, userId: user._id } });
  };

  const dislikePost = (id) => {
    postDispatch({
      type: "DISLIKE_POST",
      payload: { id: id, userId: user._id },
    });
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        addPost,
        serverResponse,
        deletePost,
        postDispatch,
        likePost,
        dislikePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
