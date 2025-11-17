import {
  useReducer,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
import authReducer from "./authReducer";
import { useFetch } from "../../services/useFetch";
import { Toast } from "../../services/Toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../user/UserProvider";

const getInitialState = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return {
      user: decodedToken,
      encodedToken: token,
      isUserLoggedIn: true,
    };
  }
  return {
    user: {},
    encodedToken: null,
    isUserLoggedIn: false,
  };
};

const initialUserAuthState = getInitialState();

const initialApiData = {
  apiURL: "",
  method: "GET",
  postMethodData: {},
  encodedToken: "",
};
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [userAuthState, userAuthDispatch] = useReducer(
    authReducer,
    initialUserAuthState
  );
  const navigate = useNavigate();
  const [apiData, setApiData] = useState(initialApiData);
  const { apiURL, method, postMethodData, encodedToken } = apiData;
  const [isLoading, setIsLoading] = useState(true);
  const { getUserData } = useUser();

  // change in apiData will call useFetch
  const { serverResponse, error } = useFetch(
    apiURL,
    method,
    postMethodData,
    encodedToken
  );
  const signinHandler = (data) => {
    if (data) {
      setApiData((prev) => {
        return {
          ...prev,
          apiURL: "/api/auth/register",
          method: "POST",
          postMethodData: { ...data },
        };
      });
    }
  };

  const loginHandler = (data) => {
    if (data) {
      setApiData((prev) => {
        return {
          ...prev,
          apiURL: "/api/auth/login",
          method: "POST",
          postMethodData: { ...data },
        };
      });
    }
  };

  const logoutHandler = () => {
    userAuthDispatch({
      type: "LOGOUT",
    });

    localStorage.clear("token");
    Toast({ type: "success", msg: "Logged out successfully!" });
    navigate("/login");
  };

  const updateUserToken = (token) => {
    const decodedToken = jwtDecode(token, process.env.USER_PWD_SECRET);
    userAuthDispatch({
      type: "LOGIN",
      payload: { encodedToken, user: { ...decodedToken } },
    });
    localStorage.setItem("token", token);
  };

  useEffect(() => {
    if (serverResponse) {
      if (serverResponse.data.action === "register") {
        Toast({
          type: "success",
          msg: "Account created successfully, Please login",
        });

        navigate("/login");
      } else if (serverResponse.data.action === "login") {
        const token = serverResponse.data.encodedToken;
        const decodedToken = jwtDecode(token);

        userAuthDispatch({
          type: "LOGIN",
          payload: { encodedToken, user: { ...decodedToken } },
        });
        localStorage.setItem("token", token);

        if (decodedToken?.id) {
          console.log("Calling getUserData with ID:", decodedToken);
          getUserData(decodedToken.id);
        } else {
          console.error("No _id found in decoded token:", decodedToken);
        }

        Toast({
          type: "success",
          msg: `Logged in as ${decodedToken.username}`,
        });

        navigate("/");
      }
    }
  }, [serverResponse]);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      console.log("hi");

      const encodedTokenTemp = localStorage.getItem("token");
      console.log(encodedTokenTemp);

      if (encodedTokenTemp) {
        // jwtDecode does not take secret on frontend
        const decodedToken = jwtDecode(encodedTokenTemp);

        userAuthDispatch({
          type: "LOGIN",
          payload: {
            isUserLoggedIn: true,
            encodedToken: encodedTokenTemp,
            user: { ...decodedToken },
          },
        });

        if (decodedToken?.id) {
          console.log("Calling getUserData with ID:", decodedToken.id);
          getUserData(decodedToken.id);
        } else {
          console.error("No id found in decoded token:", decodedToken);
        }

        navigate("/");
      }

      // always stop loading
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);


  return (
    <AuthContext.Provider
      value={{
        signinHandler,
        loginHandler,
        logoutHandler,
        userAuthState,
        isLoading,
        updateUserToken,
        initialUserAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, useAuth };
