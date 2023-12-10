import { useReducer, useState, useContext, createContext } from "react";
import authReducer from "./authReducer";
import { useFetch } from "../../services/useFetch";
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
      setApiData((prev)=>{
        return{
          ...prev,
          apiURL:"/auth/signin",
          method:"POST",
          postMethodData:{...data}
        }
      })
    }
  };

  return (
    <AuthContext.Provider value={{ signinHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider, useAuth };
