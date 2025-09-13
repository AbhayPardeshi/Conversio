import Layout from "./pages/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import Feed from "./components/Feed";
import ProfilePage from "./components/Profile/ProfilePage";
import SignInPage from "./components/authentication/SignInPage";
import LoginPage from "./components/authentication/LoginPage";
import Discover from "./components/Discover";
import Notifications from "./components/Notifications";
import Message from "./components/message/Message";
import Bookmark from "./components/Bookmark";
import { protectedRoutes as ProtectedRoute } from "./utils/protectedRoutes";
import { useAuth } from "./contexts/auth/AuthProvider";

function App() {
  const { userAuthState, isLoading } = useAuth(); 
  const { isUserLoggedIn } = userAuthState;
  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isUserLoggedIn ? (
          <Navigate to="/feed" replace />
        ) : (
          <Navigate to="/login" replace />
        )
        }
      />
      <Route path="signin" element={<SignInPage />} />
      <Route path="login" element={<LoginPage />} />

      <Route
        path="profile"
        element={
          <ProtectedRoute user={isUserLoggedIn}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      {/* Layout without Discover */}
      <Route element={<Layout showDiscover={false} />}>
        <Route
          path="message"
          element={
            <ProtectedRoute user={isUserLoggedIn}>
              <Message />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Layout with Discover */}
      <Route element={<Layout showDiscover={true} />}>
        <Route
          path="discover"
          element={
            <ProtectedRoute user={isUserLoggedIn}>
              <Discover />
            </ProtectedRoute>
          }
        />
        <Route
          path="feed"
          element={
            <ProtectedRoute user={isUserLoggedIn}>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route
          path="notifications"
          element={
            <ProtectedRoute user={isUserLoggedIn}>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="bookmark"
          element={
            <ProtectedRoute user={isUserLoggedIn}>
              <Bookmark />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
