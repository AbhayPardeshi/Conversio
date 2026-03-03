import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "../src/contexts/auth/AuthProvider";
import { PostProvider } from "./contexts/posts/PostProvider";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./contexts/user/UserProvider";
import { FollowProvider } from "./contexts/follow/FollowProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <AuthProvider>
          <FollowProvider>
            <PostProvider>
              <App />
              <ToastContainer />
            </PostProvider>
          </FollowProvider>
        </AuthProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
