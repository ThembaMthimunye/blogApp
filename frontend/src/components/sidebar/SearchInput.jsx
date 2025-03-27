import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) {
      toast.error("Please enter a search term!");
      return;
    }

    if (search.length < 3) {
      toast.error("Search term must be at least 3 characters long");
      return;
    }

    console.log("All conversations:", conversations);

    if (!Array.isArray(conversations)) {
      console.log("Error: conversations is not an array", conversations);
      toast.error("Conversations data is not available.");
      return;
    }

    const conversation = conversations.find((c) => c?.name?.toLowerCase().includes(search.toLowerCase()));
    console.log("Matching conversation:", conversation);

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type='text'
        placeholder='Search…'
        className='input input-bordered input-lg rounded-full w-[50rem]'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle btn-lg bg-sky-500 text-white'>
        <IoSearchSharp className='w-8 h-8' />
      </button>
    </form>
  );
};

export default SearchInput;