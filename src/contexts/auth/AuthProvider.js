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

const initialUserAuthState = {
  user: {},
  encodedToken: null,
  isUserLoggedIn: false,
};

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
          apiURL: "/auth/signin",
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
          apiURL: "/auth/login",
          method: "POST",
          postMethodData: { ...data },
        };
      });
    }
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
      if (serverResponse.data.action === "signup") {
        Toast({
          type: "success",
          msg: "Account created successfully",
        });

        navigate("/login");
      } else if (serverResponse.data.action === "login") {
        const token = serverResponse.data.encodedToken;
        const decodedToken = jwtDecode(token, process.env.USER_PWD_SECRET);

        userAuthDispatch({
          type: "LOGIN",
          payload: { encodedToken, user: { ...decodedToken } },
        });
        localStorage.setItem("token", token);

        Toast({
          type: "success",
          msg: `Logged in as ${decodedToken._doc.name}`,
        });

        navigate("/");
      }
    }
  }, [serverResponse]);

  useEffect(() => {
    let setTimeOutId;
    setTimeOutId = setTimeout(() => {
      const encodedTokenTemp = localStorage.getItem("token");
      if (encodedTokenTemp) {
        const decodedToken = jwtDecode(
          encodedTokenTemp,
          process.env.REACT_APP_JWT_SECRET
        );
        userAuthDispatch({
          type: "LOGIN",
          payload: {
            isUserLoggedIn: true,
            encodedToken: encodedTokenTemp,
            user: { ...decodedToken },
          },
        });

        Toast({
          type: "success",
          msg: `Logged in as ${decodedToken._doc.name}`,
        });
        setIsLoading(false);
      }
    });
    return () => clearTimeout(setTimeOutId);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signinHandler,
        loginHandler,
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
