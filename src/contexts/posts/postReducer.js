const GET_POSTS = "GET_POSTS";
const POST = "POST";
const DELETE_ONE_POST = "DELETE_ONE_POST";
const LIKE_POST = "LIKE_POST";
const DISLIKE_POST = "DISLIKE_POST";


const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        apiURL: "/posts",
        method: "GET",
      };
    case POST:
      return {
        ...state,
        apiURL: "/posts",
        method: "POST",
        postMethodData: payload,
        isFile: true,
      };
    case DELETE_ONE_POST:
      return {
        ...state,
        apiURL: `/posts/${payload}`,
        method: "DELETE",
      };

    case LIKE_POST:
      return {
        ...state,
        apiURL: `/posts/${payload.id}/like`,
        method: "POST",
        postMethodData: payload,
      };

    case DISLIKE_POST:
      return {
        ...state,
        apiURL: `/posts/${payload.id}/dislike`,
        method: "POST",
        postMethodData: payload,
      };

    default:
      return state;
  }
};

export default postReducer;
