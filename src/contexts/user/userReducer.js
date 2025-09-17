const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";

export const userReducer = (state, action) => {
  const { type, payload } = action;

  console.log(payload);

  switch (type) {
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        _id: payload._id || state._id,
        email: payload.email || state.email,
        username: payload.username || state.username,
        bio: payload.bio || state.bio,
        profilePicture: payload.profilePicture || state.profilePicture,
        coverPhoto: payload.coverPhoto || state.coverPhoto,
        bookmarkedPosts: payload.bookmarkedPosts || state.bookmarkedPosts,
        followers: payload.followers || state.followers,
        following: payload.following || state.following,
        likedPosts: payload.likedPosts || state.likedPosts,
      };

    default:
      break;
  }
};
