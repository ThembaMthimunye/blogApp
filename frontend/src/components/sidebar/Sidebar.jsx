import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  return (
    <div className='w-1/4 border-r border-slate-500 p-4 flex flex-col h-full'>
      <SearchInput />
      <div className='divider px-3'></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;