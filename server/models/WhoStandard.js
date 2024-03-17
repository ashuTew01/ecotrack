import mongoose from "mongoose";

const WhoStandardSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 80,
		},
		content: {
			type: String,
			required: true,
			maxlength: 160,
		},
		type: {
			type: String,
			required: true,
			maxlength: 20,
		},
	},
	{ timestamps: true }
);

const WhoStandard = mongoose.model("WhoStandard", WhoStandardSchema);
export default WhoStandard;
