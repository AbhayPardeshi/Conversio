import React, { useState } from "react";
import {
  Bell,
  MessageCircle,
  Heart,
  UserPlus,
  Settings,
  Check,
  X,
  Trash2,
} from "lucide-react";

const notificationsData = [
  {
    id: 1,
    type: "message",
    title: "New message from Lauren Wilson",
    description: "Help me open the door.",
    time: "2 minutes ago",
    read: false,
    avatar: "https://i.pravatar.cc/150?img=1",
    icon: MessageCircle,
  },
  {
    id: 2,
    type: "like",
    title: "Kelly Tran liked your photo",
    description: "Your recent photo got a new like",
    time: "5 minutes ago",
    read: false,
    avatar: "https://i.pravatar.cc/150?img=3",
    icon: Heart,
  },
  {
    id: 3,
    type: "follow",
    title: "New follower",
    description: "Janice Contreras started following you",
    time: "1 hour ago",
    read: true,
    avatar: "https://i.pravatar.cc/150?img=2",
    icon: UserPlus,
  },
  {
    id: 4,
    type: "message",
    title: "Linda Sullivan sent you a message",
    description: "Around 11 a.m.",
    time: "3 hours ago",
    read: true,
    avatar: "https://i.pravatar.cc/150?img=4",
    icon: MessageCircle,
  },
  {
    id: 5,
    type: "system",
    title: "Security Alert",
    description: "New login from Chrome on Windows",
    time: "6 hours ago",
    read: false,
    avatar: null,
    icon: Settings,
  },
  {
    id: 6,
    type: "like",
    title: "Joan Jones liked your comment",
    description: "Your comment on the recent post",
    time: "1 day ago",
    read: true,
    avatar: "https://i.pravatar.cc/150?img=5",
    icon: Heart,
  },
  {
    id: 7,
    type: "message",
    title: "Group message",
    description: "You have 3 new messages in Study Group",
    time: "1 day ago",
    read: true,
    avatar: "https://i.pravatar.cc/150?img=6",
    icon: MessageCircle,
  },
  {
    id: 8,
    type: "follow",
    title: "New connection request",
    description: "Alex Johnson wants to connect with you",
    time: "2 days ago",
    read: true,
    avatar: "https://i.pravatar.cc/150?img=7",
    icon: UserPlus,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState("all"); // all, unread, read

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIconColor = (type) => {
    switch (type) {
      case "message":
        return "text-blue-500";
      case "like":
        return "text-red-500";
      case "follow":
        return "text-green-500";
      case "system":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case "message":
        return "bg-blue-50";
      case "like":
        return "bg-red-50";
      case "follow":
        return "bg-green-50";
      case "system":
        return "bg-gray-50";
      default:
        return "bg-gray-50";
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  return (
    <div className="max-h-[calc(100vh-60px)] bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Notifications
              </h1>
              <p className="text-gray-600">
                {unreadCount} unread notifications
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mt-6 bg-gray-100 p-1 rounded-lg w-full justify-between ">
          {["all", "unread", "read"].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={` flex justify-between px-4 py-2 rounded-md text-sm border-2 border-gray-200 font-medium transition-colors capitalize w-full  ${
                filter === filterType
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {filterType}
              {filterType === "unread" && unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-6 space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications
              </h3>
              <p className="text-gray-500">
                {filter === "unread"
                  ? "All caught up! No unread notifications."
                  : "No notifications to show."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 rounded-xl transition-all hover:shadow-md group ${
                  notification.read
                    ? "bg-white"
                    : "bg-blue-50 border-l-4 border-l-blue-500"
                }`}
              >
                {/* Avatar/Icon */}
                <div className="relative flex-shrink-0">
                  {notification.avatar ? (
                    <img
                      src={notification.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div
                      className={`w-12 h-12 rounded-full ${getIconBg(
                        notification.type
                      )} flex items-center justify-center`}
                    >
                      <notification.icon
                        className={`w-6 h-6 ${getIconColor(notification.type)}`}
                      />
                    </div>
                  )}

                  {notification.avatar && (
                    <div
                      className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${getIconBg(
                        notification.type
                      )} flex items-center justify-center border-2 border-white`}
                    >
                      <notification.icon
                        className={`w-3 h-3 ${getIconColor(notification.type)}`}
                      />
                    </div>
                  )}

                  {!notification.read && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3
                        className={`text-sm font-semibold ${
                          notification.read ? "text-gray-900" : "text-gray-900"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.description}
                      </p>
                      <span className="text-xs text-gray-400 mt-2 block">
                        {notification.time}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-blue-500 hover:bg-blue-100 rounded-md transition-colors"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-red-500 hover:bg-red-100 rounded-md transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
