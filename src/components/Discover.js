import React, { useEffect, useMemo } from "react";
import { TbMessage2 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useFollow } from "../contexts/follow/FollowProvider";
import { useUser } from "../contexts/user/UserProvider";

const Discover = () => {
  const { followState, getFollowers, getFollowing } = useFollow();
  const { userState } = useUser();
  const navigate = useNavigate();

  const userId = userState?._id || userState?.id;

  useEffect(() => {
    
    if (userId) {
      getFollowers(userId);
      getFollowing(userId);
    }
  }, [userId]);

  const getId = (user) => {
    if (!user) return "";
    if (typeof user === "string") return user;
    return user._id || user.id || "";
  };

  const followingIds = useMemo(() => {
    return new Set((followState.following || []).map((u) => getId(u)));
  }, [followState.following]);

  const suggestedUsers = useMemo(() => {
    return (followState.followers || []).filter(
      (user) => !followingIds.has(getId(user)),
    );
  }, [followState.followers, followingIds]);

  return (
    <div className="px-4">
      <div className="flex flex-col gap-y-3">
        <p>Who to Follow</p>
        <div className="flex flex-col gap-y-3">
          {suggestedUsers.length === 0 ? (
            <p className="text-sm text-gray-500">No suggestions yet</p>
          ) : (
            suggestedUsers.map((user) => (
              <div
                key={getId(user)}
                className="flex items-center justify-between"
              >
                <div className="flex gap-2">
                  <img
                    className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
                    src={user?.profilePicture || "./assets/images/user2.jfif"}
                    alt={user?.username || "user"}
                  />
                  <div>
                    <p className="text-[0.95rem]">
                      {user?.username || "Unknown"}
                    </p>
                    <p className="text-[0.60rem] text-gray-500">
                      @{user?.username || "user"}
                    </p>
                  </div>
                </div>
                <button className="bg-blue-600 px-3 rounded-2xl text-white py-1 text-[0.8rem]">
                  Follow
                </button>
              </div>
            ))
          )}
        </div>
        <p>Show More</p>
      </div>

      <div className="flex flex-col gap-y-3 mt-5 justify-center">
        <p>Friends</p>
        <div className="flex flex-col gap-y-3">
          {(followState.following || []).length === 0 ? (
            <p className="text-sm text-gray-500">No friends yet</p>
          ) : (
            followState.following.map((user) => (
              <div
                key={getId(user)}
                className="flex items-center justify-between"
              >
                <div className="flex gap-2">
                  <img
                    className="w-[2.15rem] h-[2.1rem] rounded-full object-cover"
                    src={user?.profilePicture || "./assets/images/user2.jfif"}
                    alt={user?.username || "user"}
                  />
                  <div>
                    <p className="text-[0.95rem]">
                      {user?.username || "Unknown"}
                    </p>
                    <p className="text-[0.60rem] text-gray-500">
                      @{user?.username || "user"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    navigate("/message", { state: { selectedContact: user } })
                  }
                  className="text-gray-500 hover:text-gray-700"
                  aria-label={`Message ${user?.username || "user"}`}
                >
                  <TbMessage2 size={23} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
