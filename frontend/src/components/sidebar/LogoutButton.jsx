import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/Home'); // Navigate to home when clicked
  };

  return (
    <div className='mt-auto'>
      <BiLogOut className='w-6 h-6 text-black cursor-pointer' onClick={handleLogout} />
    </div>
  );
};

export default LogoutButton;
