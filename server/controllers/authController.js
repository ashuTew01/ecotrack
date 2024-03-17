import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
// import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const authPostTest = asyncHandler(async (req, res) => {
	const { test } = req.body;
	console.log(test);
	res.status(200).json({ message: `ROUTE /authPostTest IS WORKING ${test}` });
});

const authTest = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `ROUTE /authTest IS WORKING ${test}` });
});

const createUser = asyncHandler(async (req, res) => {
	try {
		const { fname, lname, email, password, image, phone, city, country } =
			req.body;

		var modImage = image;
		var modCity = city;
		var modCountry = country;
		if (!image) {
			modImage = "profile.jpg";
		}
		if (!city) {
			modCity = "Prayagraj";
		}
		if (!country) {
			modCountry = "India";
		}

		const user = new User({
			fname,
			lname,
			email,
			password,
			image: modImage,
			city: modCity,
			country: modCountry,
		});
		if (phone) {
			user.phone = phone;
		}

		await user.save();

		res.status(200).json({ message: "User created successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	// console.log(user);

	if (user && (await user.matchPassword(password))) {
		// generateToken(res, user._id); //this func also attaches token to response stream.
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "30d",
		});

		res.status(200).json({
			_id: user._id,
			fname: user.fname,
			lname: user.lname,
			email: user.email,
			token,
		});
	} else {
		res.status(401);
		res.status(401).json({ message: "Invalid Email or Password" });
	}
});

const logoutUser = (req, res) => {
	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).json({ message: "Logged out Successfully" });
};

export { createUser, loginUser, logoutUser, authTest, authPostTest };
