import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import React from "react";

const Message = React.forwardRef(({ message }, ref) => {
  const { selectedConversation } = useConversation();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.id);
  const fromMe = message.senderId === user.id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? user.profilePic || "/default-avatar.png"
    : selectedConversation?.profilePic || "/default-avatar.png";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-400";
  const shake = message.shouldShake ? "shake" : "";

  return (
    <div ref={ref} className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Avatar"
            src={profilePic}
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        </div>
      </div>
      <div className={`chat-bubble text-black ${shake} ${bubbleBgColor} pb-2`}>
        {message.message || "No message content"}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "N/A"}
      </div>
    </div>
  );
});

export default Message;