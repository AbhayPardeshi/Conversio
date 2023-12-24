import React from "react";
import Layout from "./pages/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Example from "./components/Example";
import ProfilePage from "./components/Profile/ProfilePage";
import SignInPage from "./components/authentication/SignInPage";
import LoginPage from "./components/authentication/LoginPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/example" element={<Example />} />
      </Routes>
    </div>
  );
}

export default App;
