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
      return { ...state, isUserLoggedIn: false, encodedToken: " ", user: {} };

    default:
      return { ...state };
  }
};
export default authReducer;
