import {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { useFetch } from "../../services/useFetch";
import { followReducer } from "./followReducer";
import { useAuth } from "../auth/AuthProvider";

const initialFollowState = {
  followers: [],
  following: [],
};

const initialApiData = {
  apiURL: "",
  method: "GET",
  postMethodData: {},
  encodedToken: "",
};

const FollowContext = createContext();
export const useFollow = () => useContext(FollowContext);

export const FollowProvider = ({ children }) => {
  const [followState, followDispatch] = useReducer(
    followReducer,
    initialFollowState
  );
  const [apiData, setApiData] = useState(initialApiData);
  const { apiURL, method, postMethodData, encodedToken } = apiData;
  const { userAuthState } = useAuth();

  const { serverResponse, error, isLoading } = useFetch(
    apiURL,
    method,
    postMethodData,
    encodedToken
  );

  const getFollowers = (userId) => {
    if (!userId) return;
    console.log("Fetching followers for userId:", userId);
    setApiData((prev) => ({
      ...prev,
      apiURL: `/api/users/${userId}/followers`,
      method: "GET",
      encodedToken: userAuthState?.encodedToken,
    }));
  };

  const getFollowing = (userId) => {
    if (!userId) return;
    console.log("Fetching following for userId:", userId);
    setApiData((prev) => ({
      ...prev,
      apiURL: `/api/users/${userId}/following`,
      method: "GET",
      encodedToken: userAuthState?.encodedToken,
    }));
  };

  const followUser = (targetUserId) => {
    const currentUserId = userAuthState?.user?._id;
    if (!targetUserId || !currentUserId) return;
    setApiData((prev) => ({
      ...prev,
      apiURL: `/api/users/${targetUserId}/follow`,
      method: "POST",
      postMethodData: { userId: currentUserId },
      encodedToken: userAuthState?.encodedToken,
    }));
  };

  const unfollowUser = (targetUserId) => {
    const currentUserId = userAuthState?.user?._id;
    if (!targetUserId || !currentUserId) return;
    setApiData((prev) => ({
      ...prev,
      apiURL: `/api/users/${targetUserId}/unfollow`,
      method: "POST",
      postMethodData: { userId: currentUserId },
      encodedToken: userAuthState?.encodedToken,
    }));
  };

  useEffect(() => {
    if (!serverResponse?.data) return;

    const data = serverResponse.data;

    const followers =
      data.followers ||
      data.users ||
      data?.user?.followers ||
      data?.userData?.followers ||
      data?.data?.followers;

    const following =
      data.following ||
      data.users ||
      data?.user?.following ||
      data?.userData?.following ||
      data?.data?.following;

    if (followers || following) {
      followDispatch({
        type: "UPDATE_FOLLOW_STATE",
        payload: {
          followers,
          following,
        },
      });
      return;
    }

    if (data.action === "followersFetched") {
      followDispatch({ type: "SET_FOLLOWERS", payload: data.followers });
      return;
    }

    if (data.action === "followingFetched") {
      followDispatch({ type: "SET_FOLLOWING", payload: data.following });
      return;
    }

    if (data.action === "followed") {
      followDispatch({ type: "FOLLOW_USER", payload: data.user });
      return;
    }

    if (data.action === "unfollowed") {
      followDispatch({ type: "UNFOLLOW_USER", payload: data.user });
    }
  }, [serverResponse]);

  return (
    <FollowContext.Provider
      value={{
        followState,
        followDispatch,
        getFollowers,
        getFollowing,
        followUser,
        unfollowUser,
        isFollowLoading: isLoading,
        followError: error,
      }}
    >
      {children}
    </FollowContext.Provider>
  );
};
