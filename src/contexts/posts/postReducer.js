const GET_POSTS = "GET_POSTS";
const POST = "POST";
const DELETE_ONE_POST = "DELETE_ONE_POST";
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
        postMethodData: { ...payload },
      };
    case DELETE_ONE_POST:
      return {
        ...state,
        apiURL: `/posts/${payload}`,
        method: "DELETE",
      };

    default:
      return state;
  }
};

export default postReducer;
