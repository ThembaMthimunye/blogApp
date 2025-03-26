import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	// const { authUser } = useAuthContext();
	 const { selectedConversation } = useConversation();

	// // Ensure message, authUser, and selectedConversation exist before accessing properties
	// if (!authUser) {
    //     console.warn("Auth user is missing!");
    //     return null; // Prevent rendering until authUser is available
    // }

    // if (!message) {
    //     console.warn("Message is missing!");
    //     return null;
    // }
	const user=JSON.parse(localStorage.getItem("user"))
	console.log(user.id)
	const fromMe = message.senderId === user.id;
	// console.log("xxxxx",fromMe)
	// console.log(message.senderId,"sender")
	// console.log(user.id,"auth user")
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe
		? user.profilePic || "/default-avatar.png" // Fallback if no profile pic
		: selectedConversation?.profilePic || "/default-avatar.png";

	const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-4 00";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className="chat-image avatar">
				<div className="w-10 rounded-full">
					<img
						alt="User Avatar"
						src={profilePic}
						onError={(e) => (e.target.src = "/default-avatar.png")} // Fallback if image fails
					/>
				</div>
			</div>
			 <div className={`chat-bubble text-black ${bubbleBgColor} pb-2`}>
				{message.message || "No message content"}
				
			</div>
			<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
				{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || "N/A"}
			</div>
		</div>
	);
};

export default Message;
