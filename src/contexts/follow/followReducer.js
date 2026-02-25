const SET_FOLLOWERS = "SET_FOLLOWERS";
const SET_FOLLOWING = "SET_FOLLOWING";
const UPDATE_FOLLOW_STATE = "UPDATE_FOLLOW_STATE";
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";

const getUserId = (user) => {
  if (typeof user === "string") return user;
  return user?._id;
};

const addUniqueById = (list, user) => {
  const userId = getUserId(user);
  if (!userId) return list;
  if (list.some((item) => getUserId(item) === userId)) return list;
  return [...list, user];
};

const removeById = (list, user) => {
  const userId = getUserId(user);
  if (!userId) return list;
  return list.filter((item) => getUserId(item) !== userId);
};

export const followReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FOLLOWERS:
      return {
        ...state,
        followers: Array.isArray(payload) ? payload : state.followers,
      };

    case SET_FOLLOWING:
      return {
        ...state,
        following: Array.isArray(payload) ? payload : state.following,
      };

    case UPDATE_FOLLOW_STATE:
      return {
        ...state,
        followers: Array.isArray(payload?.followers)
          ? payload.followers
          : state.followers,
        following: Array.isArray(payload?.following)
          ? payload.following
          : state.following,
      };

    case FOLLOW_USER:
      return {
        ...state,
        following: addUniqueById(state.following, payload),
      };

    case UNFOLLOW_USER:
      return {
        ...state,
        following: removeById(state.following, payload),
      };

    default:
      return state;
  }
};
