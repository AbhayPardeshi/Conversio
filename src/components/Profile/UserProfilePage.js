import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { usePost } from "../../contexts/posts/PostProvider";
import Posts from "../Post";

const UserProfilePage = () => {
  const { userId } = useParams();
  const { posts } = usePost();

  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeList, setActiveList] = useState("posts"); // posts | followers | following

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/users/${userId}`,
          {
            headers: { authorization: localStorage.getItem("token") || "" },
          }
        );
        setUser(res.data?.user || res.data?.data || res.data || null);
      } catch (err) {
        console.error("Error fetching user profile", err);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchFollowersFollowing = async () => {
      try {
        const [followersRes, followingRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/users/${userId}/followers`, {
            headers: { authorization: localStorage.getItem("token") || "" },
          }),
          axios.get(`http://localhost:3001/api/users/${userId}/following`, {
            headers: { authorization: localStorage.getItem("token") || "" },
          }),
        ]);
        const followersList =
          followersRes.data?.users ||
          followersRes.data?.followers ||
          followersRes.data?.data?.users ||
          [];
        const followingList =
          followingRes.data?.users ||
          followingRes.data?.following ||
          followingRes.data?.data?.users ||
          [];
        setFollowers(followersList);
        setFollowing(followingList);
      } catch (err) {
        console.error("Error fetching followers/following", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchFollowersFollowing();
  }, [userId]);

  const userPosts = useMemo(() => {
    return (posts || []).filter((post) => {
      const postUserId = post?.user?._id || post?.user?.id || post?.userId;
      return String(postUserId) === String(userId);
    });
  }, [posts, userId]);

  if (loading) {
    return (
      <div className="w-full p-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full p-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          User not found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
        {/* Cover */}
        <div className="h-40 bg-gradient-to-r from-slate-100 to-slate-200" />

        {/* Profile Row */}
        <div className="px-6 pb-4">
          <div className="-mt-12 flex items-end justify-between gap-4">
            <img
              src={user?.profilePicture || "/default-avatar.png"}
              alt={user?.username || "user"}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white"
            />
            <button className="px-4 py-2 text-sm font-semibold border rounded-full">
              Follow
            </button>
          </div>
          <div className="mt-3">
            <div className="text-lg font-semibold text-gray-900">
              {user?.username || "Unknown"}
            </div>
            <div className="text-sm text-gray-500">
              @{user?.username || "user"}
            </div>
            {user?.bio ? (
              <p className="text-sm text-gray-700 mt-2">{user.bio}</p>
            ) : null}
          </div>

          <div className="mt-3 flex gap-6 text-sm text-gray-600">
            <span>
              <span className="text-gray-900 font-semibold">
                {following.length}
              </span>{" "}
              Following
            </span>
            <span>
              <span className="text-gray-900 font-semibold">
                {followers.length}
              </span>{" "}
              Followers
            </span>
            <span>
              <span className="text-gray-900 font-semibold">
                {userPosts.length}
              </span>{" "}
              Posts
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-b border-gray-100">
          <div className="flex justify-between px-6">
            {["Posts", "Followers", "Following"].map((tab) => {
              const key = tab.toLowerCase();
              return (
                <button
                  key={tab}
                  onClick={() => setActiveList(key)}
                  className={`py-3 text-sm font-semibold ${
                    activeList === key
                      ? "text-gray-900 border-b-2 border-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4">
        {activeList === "posts" && (
          <>
            {userPosts.length === 0 ? (
              <div className="bg-white border border-gray-100 p-6 text-sm text-gray-500 shadow-sm">
                No posts yet
              </div>
            ) : (
              <Posts
                posts={userPosts}
                enableInfiniteScroll={false}
                showEndMessage={false}
              />
            )}
          </>
        )}

        {activeList === "followers" && (
          <div className="bg-white border border-gray-100 p-4 shadow-sm">
            {followers.length === 0 ? (
              <p className="text-sm text-gray-500">No followers yet</p>
            ) : (
              followers.map((follower) => (
                <div
                  key={follower._id || follower.id}
                  className="flex items-center gap-3 py-3 border-b last:border-b-0"
                >
                  <img
                    src={follower.profilePicture || "/default-avatar.png"}
                    alt={follower.username || "user"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {follower.username || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      @{follower.username || "user"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeList === "following" && (
          <div className="bg-white border border-gray-100 p-4 shadow-sm">
            {following.length === 0 ? (
              <p className="text-sm text-gray-500">Not following anyone yet</p>
            ) : (
              following.map((followed) => (
                <div
                  key={followed._id || followed.id}
                  className="flex items-center gap-3 py-3 border-b last:border-b-0"
                >
                  <img
                    src={followed.profilePicture || "/default-avatar.png"}
                    alt={followed.username || "user"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {followed.username || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500">
                      @{followed.username || "user"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
