import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "../src/contexts/auth/AuthProvider";
import { PostProvider } from "./contexts/posts/PostProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  </React.StrictMode>
);
