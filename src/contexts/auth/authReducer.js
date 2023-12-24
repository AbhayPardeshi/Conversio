const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const { encodedToken, user } = action.payload;
      return {
        ...state,
        isUserLoggedIn: true,
        encodedToken: encodedToken,
        user: { ...user },
      };
    case "LOGOUT":
      return { ...state, user: null };

    default:
      return { ...state };
  }
};
export default authReducer;
