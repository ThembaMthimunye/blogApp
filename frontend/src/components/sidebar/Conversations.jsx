import Conversation from "../../components/sidebar/Conversation ";
import useGetConversations from "../../hooks/useGetConversations.js"; 
import { getRandomEmoji } from "@/utils/emojis";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
   console.log("Conversations:", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <p>Loading conversations...</p>
      ) : conversations.length > 0 ? (
        conversations.map((conversation) => (
          <Conversation
            key={conversation._id}
            id={conversation.id}
            name={conversation.name}
            conversation={conversation}
            // lastIdx={idx===conversations.length-1}
            emoji={getRandomEmoji()}
          />
        ))
      ) : (
        <p>No conversations found.</p>
      )}
    </div>
  );
};

export default Conversations;