import { BiLogOut } from "react-icons/bi";
// import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	// const { loading, logout } = useLogout();

	return (
		<div className='mt-auto'>
			{/* {!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer'  />
			) : (
				<span className='loading loading-spinner'></span>
			)} */}
            <BiLogOut className='w-6 h-6 text-black cursor-pointer'  />
		</div>
	);
};
export default LogoutButton;