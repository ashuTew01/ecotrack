import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		fname: {
			type: String,
			required: true,
		},
		lname: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		carbonFootprint: [
			{
				year: Number,
				month: Number,
				categories: {
					transport: Number,
					electricity: Number,
					others: Number,
				},
			},
		],
		waterUsage: [
			{
				year: Number,
				month: Number,
				categories: {
					drinking: Number, // in liters
					cooking: Number, // in liters
					bathing: Number, // in liters
					clothWashing: Number, // in liters
					utensilsWashing: Number, // in liters
					houseWashing: Number, // in liters
					waterClosetsFlushing: Number, // in liters
					others: Number, // in liters
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

userSchema.methods.matchPassword = async function (enteredPasseword) {
	return await bcrypt.compare(enteredPasseword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
