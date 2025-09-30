import React, { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useFetch } from "../../services/useFetch"; // adjust the import path as needed
import "./message.css";
import axios from "axios";
import { useUser } from "../../contexts/user/UserProvider";
import { socket } from "../../utils/socket";
import { ro } from "date-fns/locale";

const Message = () => {
  const [selectedContact, setSelectedContact] = useState([]);
  const [contactsData, setContactsData] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]); // [{_id, conversation, sender, text, createdAt}]
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const messagesEndRef = useRef(null);

  const { userState } = useUser();
  const currentUserId = userState?._id;

  console.log("selectedContact", selectedContact);
  const roomId = `dm:${[currentUserId, selectedContact._id].sort().join(":")}`;
  useEffect(() => {
    if (!selectedContact?._id) return;
    console.log("this ran joindm");

    socket.emit("joinDm", {
      selfUserId: currentUserId,
      otherUserId: selectedContact._id,
    });
  }, [selectedContact, currentUserId]);

  useEffect(() => {
    const handler = (msg) => {
      // fix needed : send correct roomId for that conversation
      if (msg.roomId === roomId) {
        setMessages((prev) => [...prev, msg]);
        scrollToBottom();
      }
    };

    const fetchUsers = async () => {
      const usersMessaged = await axios.get(
        `http://localhost:3001/api/chat/conversation?userId=${currentUserId}`
      );

      setContactsData(usersMessaged.data.users);
    };

    fetchUsers();

    socket.on("newMessage", handler);
    return () => socket.off("newMessage", handler);
  }, [socket, selectedContact?._id, currentUserId]);

  useEffect(() => {
    const fetchConversation = async () => {
      if (!selectedContact?._id) return;
      console.log("this ran insert convo and fetch messages");
      try {
        // 1) Upsert DM conversation
        const res = await axios.post("http://localhost:3001/api/chat/dm", {
          userIdA: currentUserId,
          userIdB: selectedContact._id,
        });
        const convo = res.data; // conversation object
        setConversation(convo);

        // 2) Fetch messages for this conversation
        const messagesRes = await axios.get(
          `http://localhost:3001/api/chat/${convo._id}/messages`
        );
        setMessages(messagesRes.data || []);
      } catch (err) {
        console.error("Error fetching conversation/messages", err);
      }
    };

    fetchConversation();
  }, [selectedContact?._id]);

  const setSearchedUser = (user) => {
    setContactsData((prev) => {
      if (prev.some((c) => c._id === user._id)) return prev;
      return [...prev, user];
    });
    setSelectedContact(user);
    setQuery("");
  };

  // Typing indicator (optional)
  const handleTyping = (val) => {
    setInput(val);
    if (!conversation?._id) return;
    socket.emit("typing", {
      roomId: roomId,
      userId: currentUserId,
      isTyping: val.length > 0,
    });
  };

  // Send message via sockets
  const send = () => {
    const text = input.trim();
    if (!text || !selectedContact) return;

    // 1️⃣ Compute the dynamic DM room ID
    const roomId = `dm:${[currentUserId, selectedContact._id]
      .sort()
      .join(":")}`;

    // 2️⃣ Emit to server
    socket.emit("sendDm", {
      selfUserId: currentUserId,
      otherUserId: selectedContact._id,
      message: { text },
    });

    // 3️⃣ Clear input
    setInput("");
  };

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (messagesEndRef.current)
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setSearchUsers([]);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:3001/api/users`, {
          params: { query },
        });
        if (res.data.action === "searchedUsers") {
          setSearchUsers(res.data.userList);
        }
      } catch (err) {
        console.error(err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="flex bg-white h-[calc(100vh-70px)] shadow-lg rounded-lg overflow-hidden border-none">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r flex flex-col">
        <div className="p-4 border-b bg-white h-[5rem]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-6 border rounded focus:outline-none focus:border-blue-500 bg-gray-100 rounded-3xl"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* If search query exists, show filtered search results */}
          {query.trim()
            ? searchUsers.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100"
                  onClick={() => setSearchedUser(user)}
                >
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {user.username}
                    </h3>
                  </div>
                </div>
              ))
            : contactsData.map((contact) => (
                <div
                  key={contact?._id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                    selectedContact._id === contact?._id
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <img
                    src={contact?.profilePicture}
                    alt=""
                    className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {contact?.username}
                      </h3>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {contact?.time}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-500 text-sm">
                      <span className="truncate pr-2">
                        {contact?.lastMessage}
                      </span>
                      {contact.unread > 0 && (
                        <span className="bg-red-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs flex-shrink-0">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedContact.length === 0 ? (
        <div className="flex-1 flex flex-col">
          <p>All your messages at one place</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 bg-gray-300 border-b shadow-sm h-[5rem]">
            <div className="flex items-center">
              <img
                src={selectedContact?.profilePicture}
                alt=""
                className="w-8 h-8 rounded-full mr-3"
              />
              <div className="flex flex-col">
                <h2 className="font-semibold text-gray-900">
                  {selectedContact?.username}
                </h2>
                {/* {isUpserting || isLoadingHistory ? (
                <span className="text-xs text-gray-600">Loading chat…</span>
              ) : null}
              {upsertError?.message || historyError?.message ? (
                <span className="text-xs text-red-600">
                  {upsertError?.message || historyError?.message}
                </span>
              ) : null} */}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100 scrollbar-hide">
            <div className="space-y-4">
              {messages.map((msg, index) => {
                const isMe =
                  String(msg.senderId || msg.sender) === String(currentUserId);
                return (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isMe && (
                      <img
                        src={selectedContact.profilePicture}
                        alt=""
                        className="w-8 h-8 rounded-full flex-shrink-0 mb-1"
                      />
                    )}
                    <div
                      className={`p-3 rounded-2xl max-w-[75%] break-words ${
                        isMe
                          ? "bg-blue-500 text-white rounded-br-md"
                          : "bg-white text-gray-900 rounded-bl-md shadow-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span
                        className={`text-xs block mt-1 ${
                          isMe ? "text-blue-100" : "text-gray-400"
                        }`}
                      >
                        {new Date(
                          msg.createdAt || Date.now()
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    {isMe && (
                      <img
                        src={userState?.profilePicture}
                        alt={useState?.username}
                        className="w-8 h-8 rounded-full flex-shrink-0 mb-1"
                      />
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="border-t shadow-sm p-4 bg-gray-200">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => handleTyping(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) send();
                }}
                className="flex-1 p-3 rounded-full focus:outline-none focus:border-blue-500 bg-white"
              />
              <button
                onClick={send}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
