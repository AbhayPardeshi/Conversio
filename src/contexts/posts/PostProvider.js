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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
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
      postDispatch({ type: "GET_POSTS", payload: { page: 1, limit: 10 } });
    }
  }, [isLoading, userAuthState]);

  useEffect(() => {
    if (serverResponse) {
      const handleResponse = () => {
        const { action, posts, savedPost, pagination, message } =
          serverResponse.data;

        switch (action) {
          case "feedPosts":
            if (pagination.page === 1) {
              setPosts(posts);
            } else {
              setPosts((prev) => [...prev, ...posts]);
            }
            setHasMore(pagination.hasMore);
            break;

          case "postAdded":
            setPosts((prevPosts) => [savedPost, ...prevPosts]); // Add new post to beginning
            postDispatch({ type: "GET_POSTS" });
            Toast({ type: "success", msg: "post created successfully" });
            break;
          case "postBookmarked":
            Toast({ type: "success", msg: "post bookmarked successfully" });
            break;

          case "postLiked":
            setPosts((prevPosts) =>
              prevPosts.map((post) => (post._id === posts._id ? posts : post))
            );

            break;
            console.error("Unknown action:", action);
        }
      };

      handleResponse();
    }
  }, [serverResponse]);

  const loadMorePosts = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      postDispatch({
        type: "GET_POSTS",
        payload: { page: nextPage, limit: 5 },
      });
    }
  };

  const addPost = async (data) => {
    console.log(data);

    postDispatch({
      type: "ADD_POST",
      payload: data,
    });
  };

  const deletePost = (id) => {
    postDispatch({ type: "DELETE_ONE_POST", payload: id });
  };

  const likePost = (id, userId) => {
    postDispatch({ type: "LIKE_POST", payload: { id: id, userId: userId } });
  };

  const bookmarkPost = (id, userId) => {
    postDispatch({
      type: "BOOKMARK_POST",
      payload: { id: id, userId: userId },
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
        loadMorePosts,
        bookmarkPost,
        hasMore,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
