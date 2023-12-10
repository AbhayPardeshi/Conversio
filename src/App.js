import React from "react";
import Layout from "./pages/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./components/Profile/ProfilePage";
import SignInPage from "./components/authentication/SignInPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} ></Route>
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
