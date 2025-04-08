import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "@/Skeletons/MessageSkeleton";
import useListenMessage from "@/hooks/useListenMessage";
import { useEffect, useRef } from "react";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log("messages", messages);
  useListenMessage();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 && messages.map((message, idx) => (
        <Message
          key={message._id}
          message={message}
          ref={idx === messages.length - 1 ? lastMessageRef : null} // Attach ref to last message
        />
      ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center text-black">Send a message to start a conversation</p>
      )}
    </div>
  );
};

export default Messages;