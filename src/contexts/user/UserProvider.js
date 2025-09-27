import { useFetch } from "../../services/useFetch";
import {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { userReducer } from "./userReducer";
import { Toast } from "../../services/Toast";

const userData = {
  _id: "",
  email: "",
  username: "",
  bio: "",
  profilePicture: "",
  coverPhoto: "",
  bookmarkedPosts: [],
  followers: [],
  following: [],
  likedPosts: [],
};

const initialAPIState = {
  apiURL: "",
  method: "GET",
  userMethodData: {},
  userData: { ...userData },
};

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(userReducer, userData);

  const [apiData, setApiData] = useState(initialAPIState);
  const { apiURL, method, userMethodData, encodedToken } = apiData;
  const [isUserLoading, setIsUserLoading] = useState(true);

  const { serverResponse, error } = useFetch(apiURL, method, userMethodData);

  const getUserData = (userId) => {
    if (userId) {
      console.log("hello inside getUserData");

      //userDispatch({ type: "GET_USER_DETAILS", payload: { userId: userId } });
      setApiData((prev) => {
        return {
          ...prev,
          apiURL: `/api/users/${userId}`,
          method: "GET",
        };
      });
    }
  };

  const updateBookmarks = (postId) => {
    userDispatch({ type: "GET_USER_DETAILS", payload: { postId: postId } });
  };

  const bookmarkPost = (postId, userId) => {
    if (postId) {
      setApiData((prev) => {
        return {
          ...prev,
          apiURL: `/api/bookmark/${userId}`,
          method: "POST",
          userMethodData: { postId: postId },
        };
      });
    }
  };

  

  useEffect(() => {
    if (serverResponse) {
      switch (serverResponse.data.action) {
        case "setUser":
          userDispatch({
            type: "UPDATE_USER_DETAILS",
            payload: { ...serverResponse.data.user },
          });
          break;

        case "postBookmarked":
          userDispatch({
            type: "UPDATE_BOOKMARK_POST",
            payload: serverResponse.data.postId,
          });
          break;

        default:
          break;
      }

      setIsUserLoading(false);
    }
  }, [serverResponse]);

  return (
    <UserContext.Provider
      value={{
        userState,
        userDispatch,
        getUserData,
        userData,
        isUserLoading,
        bookmarkPost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
