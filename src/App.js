// import React from "react";
// import Layout from "./pages/Layout";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import Feed from "./components/Feed";
// import ProfilePage from "./components/Profile/ProfilePage";
// import SignInPage from "./components/authentication/SignInPage";
// import LoginPage from "./components/authentication/LoginPage";
// import Discover from "./components/Discover";
// import Notifications from "./components/Notifications";
// import Message from "./components/Message";
// import Bookmark from "./components/Bookmark";
// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Navigate to="/feed" replace />} />
//         <Route path="signin" element={<SignInPage />} />
//         <Route path="login" element={<LoginPage />} />

//         <Route element={<Layout />}>
//           <Route path="feed" element={<Feed />} />
//           <Route path="discover" element={<Discover />} />
//           <Route path="notifications" element={<Notifications />} />
//           <Route path="message" element={<Message />} />
//           <Route path="bookmark" element={<Bookmark />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;
import React from "react";
import Layout from "./pages/Layout";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Feed from "./components/Feed";
import ProfilePage from "./components/Profile/ProfilePage";
import SignInPage from "./components/authentication/SignInPage";
import LoginPage from "./components/authentication/LoginPage";
import Discover from "./components/Discover";
import Notifications from "./components/Notifications";
import Message from "./components/message/Message";
import Bookmark from "./components/Bookmark";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/feed" replace />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="profile" element={<ProfilePage />} />

      {/* Layout without Discover */}
      <Route element={<Layout showDiscover={false} />}>
        <Route path="message" element={<Message />} />
      </Route>

      {/* Layout with Discover */}
      <Route element={<Layout showDiscover={true} />}>
        <Route path="discover" element={<Discover />} />
        <Route path="feed" element={<Feed />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="bookmark" element={<Bookmark />} />
      </Route>
    </Routes>
  );
}

export default App;
