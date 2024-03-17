import mongoose from "mongoose";

const EcofriendlyTipSchema = new mongoose.Schema(
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

const EcofriendlyTip = mongoose.model("EcofriendlyTip", EcofriendlyTipSchema);
export default EcofriendlyTip;
