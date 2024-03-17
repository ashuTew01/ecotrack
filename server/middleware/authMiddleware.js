import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";

import User from "../models/User.js";

const authorizeUser = asyncHandler(async (req, res, next) => {
	let token;

	// Read JWT from the 'jwt' cookie
	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.userId).select("-password");
			next();
		} catch (error) {
			console.error(error);
			res.status(401).json({ message: "Not authorized, token failed" });
		}
	} else {
		res.status(401).json({ message: "Not authorized, no token" });
	}
});
export { authorizeUser };
