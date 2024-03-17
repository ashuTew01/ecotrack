import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
	const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});

	// Set JWT as an HTTP-Only cookie
	res.cookie("jwt", token, {
		httpOnly: false,
		secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
		sameSite: "none", // Prevent CSRF attacks
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});
};

export { generateToken };
