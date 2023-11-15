import React from "react";
import Layout from "./pages/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./components/Profile/ProfilePage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </Router>
        
    </div>
  );
}

export default App;
