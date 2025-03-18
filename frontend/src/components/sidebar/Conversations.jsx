import Conversation from "../../components/sidebar/Conversation ";
import useGetConversations from "../../hooks/useGetConversations.js"; // Adjusted path

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
            key={conversation.id}
            id={conversation.id}
            name={conversation.name}
            // Add other props as needed
          />
        ))
      ) : (
        <p>No conversations found.</p>
      )}
    </div>
  );
};

export default Conversations;