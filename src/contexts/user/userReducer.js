const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS";
const UPDATE_BOOKMARK_POST = "UPDATE_BOOKMARK_POST";

export const userReducer = (state, action) => {
  const { type, payload } = action;

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

    case UPDATE_BOOKMARK_POST:
      const postId = payload; // assume payload is a single post id
      const isBookmarked = state.bookmarkedPosts.includes(postId);

      return {
        ...state,
        bookmarkedPosts: isBookmarked
          ? state.bookmarkedPosts.filter((id) => id !== postId) // remove
          : [...state.bookmarkedPosts, postId], // add
      };

    default:
      return state;
  }
};
