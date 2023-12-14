import {
  useReducer,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";
import authReducer from "./authReducer";
import { useFetch } from "../../services/useFetch";
import  {Toast}  from "../../services/Toast";
import { useNavigate } from "react-router-dom";

const initialUserAuthState = {
  user: {},
  encodedToken: null,
  isLoggedIn: false,
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

  const { serverResponse, error, isLoading } = useFetch(
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

  useEffect(() => {
    if (serverResponse) {
      
      if (serverResponse.data.action === "signup") {
        Toast({
          type: "success",
          msg: "Account created successfully",
        });
        
        setTimeout(() => {
          navigate("/login");
        }, 200);
      }
      
    }
  }, [serverResponse]);

  return (
    <AuthContext.Provider value={{ signinHandler, loginHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, useAuth };
