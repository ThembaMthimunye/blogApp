import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "@/Skeletons/MessageSkeleton";
import useListenMessage from "@/hooks/useListenMessage";
const Messages = () => {
	const {messages,loading}=useGetMessages();
	console.log("message",messages)
	useListenMessage();
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading&&messages.length>0&&messages.map((message)=>(
				<Message key={message._id} message={message}/>
			))}
			{loading&&[...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}
			{!loading && messages.length===0&&(
				<p className="text-center text-black">Send a message to start a conversation</p>
			)}
		</div>
	);
};
export default Messages;