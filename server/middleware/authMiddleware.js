import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";

import User from "../models/User.js";

const authorizeUserOld = asyncHandler(async (req, res, next) => {
	let token;

	// Read JWT from the 'jwt' cookie
	token = req.cookies.jwt;
	console.log(req.cookies);
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

const authorizeUser = asyncHandler(async (req, res, next) => {
	let token = req.header("Authorization");
	console.log(req.header);
	if (!token) {
		return res.status(403).send("Access Denied");
	}
	if (token.startsWith("Bearer ")) {
		token = token.slice(7, token.length).trimLeft();
	}

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
