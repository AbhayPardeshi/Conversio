import React, { useState } from "react";
import './message.css';
const contactsData = [
  {
    id: 1,
    name: "Lauren Wilson",
    lastMessage: "Help me open the door.",
    time: "3h",
    unread: 3,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Janice Contreras",
    lastMessage: "Who are these three?",
    time: "6h",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Kelly Tran",
    lastMessage: "You will be monitored😄",
    time: "10h",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Linda Sullivan",
    lastMessage: "Around 11 a.m.",
    time: "13h",
    unread: 4,
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Joan Jones",
    lastMessage: "Is the head cute?",
    time: "17h",
    unread: 1,
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  // Added more contacts to demonstrate scrolling
  // ...Array(15)
  //   .fill(null)
  //   .map((_, i) => ({
  //     id: 6 + i,
  //     name: `Extra Contact ${i + 1}`,
  //     lastMessage: "More messages here...",
  //     time: "1d",
  //     unread: i % 3 === 0 ? 2 : 0,
  //     avatar: `https://i.pravatar.cc/150?img=${6 + (i % 10)}`,
  //   })),
];

const messagesData = [
  {
    id: 1,
    sender: "other",
    text: "Similar to the West Lake and Thousand Island Lake😂",
  },
  { id: 2, sender: "me", text: "what is that" },
  {
    id: 3,
    sender: "other",
    text: "I want to see some other ways to explain the scenic spots.",
  },
  { id: 4, sender: "me", text: "I do not know!" },
  {
    id: 5,
    sender: "me",
    text: "I don't use this kind of class very much.",
    time: "9:31 am",
  },
  { id: 6, sender: "other", text: "Who are these three?" },
  // Added more messages to demonstrate scrolling
  // ...Array(20)
  //   .fill(null)
  //   .map((_, i) => ({
  //     id: 7 + i,
  //     sender: i % 2 === 0 ? "me" : "other",
  //     text: `This is message number ${
  //       i + 7
  //     }. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  //     time: i === 19 ? "10:15 am" : undefined,
  //   })),
];

const Message = () => {
  const [selectedContact, setSelectedContact] = useState(contactsData[1]);

  return (
    <div className="flex bg-white h-[calc(100vh-70px)] shadow-lg rounded-lg overflow-hidden border-none">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r flex flex-col">
        {/* Search bar (fixed) */}
        <div className="p-4 border-b bg-white h-[5rem]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-6 border rounded focus:outline-none focus:border-blue-500 bg-gray-100 rounded-3xl"
          />
        </div>

        {/* Contact list (scrollable) */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {contactsData.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
                selectedContact.id === contact.id
                  ? "bg-blue-50 border-l-4 border-l-blue-500"
                  : ""
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <img
                src={contact.avatar}
                alt=""
                className="w-10 h-10 rounded-full mr-3 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {contact.name}
                  </h3>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {contact.time}
                  </span>
                </div>
                <div className="flex justify-between items-center text-gray-500 text-sm">
                  <span className="truncate pr-2">{contact.lastMessage}</span>
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
      <div className="flex-1 flex flex-col">
        {/* Chat Header (fixed) */}
        <div className="p-4 bg-gray-300 border-b shadow-sm h-[5rem]">
          <div className="flex items-center">
            <img
              src={selectedContact.avatar}
              alt=""
              className="w-8 h-8 rounded-full mr-3"
            />
            <h2 className="font-semibold text-gray-900">
              {selectedContact.name}
            </h2>
          </div>
        </div>

        {/* Messages (scrollable) */}
        <div className="flex-1  p-4 overflow-y-auto bg-gray-100 scrollbar-hide">
          <div className="space-y-4">
            {messagesData.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender === "me" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Avatar for other person (left side) */}
                {msg.sender === "other" && (
                  <img
                    src={selectedContact.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full flex-shrink-0 mb-1"
                  />
                )}

                {/* Message bubble */}
                <div
                  className={`p-3 rounded-2xl max-w-[75%] break-words ${
                    msg.sender === "me"
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-white text-gray-900 rounded-bl-md shadow-sm"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  {msg.time && (
                    <span
                      className={`text-xs block mt-1 ${
                        msg.sender === "me" ? "text-blue-100" : "text-gray-400"
                      }`}
                    >
                      {msg.time}
                    </span>
                  )}
                </div>
                {msg.sender === "me" && (
                  <img
                    src="https://i.pravatar.cc/150?img=99" // Your avatar
                    alt=""
                    className="w-8 h-8 rounded-full flex-shrink-0 mb-1"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Input (fixed at bottom) */}
        <div className="border-t shadow-sm p-4 bg-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-3 rounded-full focus:outline-none focus:border-blue-500 bg-white"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
