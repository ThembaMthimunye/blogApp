import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId,res) => {
	const token = jwt.sign({ userId }, "1234", {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, 
		httpOnly: true, 
		sameSite: "strict", 
		secure: process.env.NODE_ENV !== "development",
	});
	// localStorage.setItem("user",token)
	return token
};

export default generateTokenAndSetCookie;