//ALL CONTROLLERS ARE PROTECTED.

import asyncHandler from "../middleware/asyncHandler.js";
import EcofriendlyTip from "../models/ecofriendlyTip.js";

const ecofriendlyTipsTest = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "ROUTE /eco-tips/test IS WORKING" });
});

// POST url /ecofriendly-tips/add-multiple
const createMultipleEcofriendlyTips = async (req, res) => {
	try {
		const { tips } = req.body;

		if (!Array.isArray(tips)) {
			return res.status(400).json({
				message:
					"Invalid data format. Please provide an array of ecofriendly tips within the 'tips' property",
			});
		}

		if (tips.length > 500) {
			return res.status(400).json({
				message: "Maximum 500 ecofriendly tips allowed in a single request",
			});
		}

		// Individual validation and saving (logic remains similar)
		const createdTips = [];
		for (const tip of tips) {
			const { title, content, type } = tip;

			// ... validation and saving logic (same as previous version)

			const newEcofriendlyTip = new EcofriendlyTip({ title, content, type });
			const savedTip = await newEcofriendlyTip.save();
			createdTips.push(savedTip);
		}

		const numCreatedTips = createdTips.length;
		const message =
			numCreatedTips === tips.length
				? "All ecofriendly tips added successfully"
				: `${numCreatedTips} Tips added successfully (some may have failed validation)`;

		res.status(201).json({ message, data: createdTips });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const getRandomEcofriendlyTips = async (req, res) => {
	const lim = 30;

	try {
		const randomTips = await EcofriendlyTip.aggregate([
			{ $match: {} },
			{ $addFields: { randomValue: { $rand: {} } } },
			{ $sort: { randomValue: 1 } },
			{ $limit: lim },
		]);

		if (!randomTips.length) {
			return res
				.status(200)
				.json({ message: "No ecofriendly tips found in the database" });
		}

		res.status(200).json({
			message: `${randomTips.length} Random Ecofriendly Tips`,
			data: randomTips,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const getRandomOneTip = async (req, res) => {
	const lim = 1;

	try {
		const randomTips = await EcofriendlyTip.aggregate([
			{ $match: {} },
			{ $addFields: { randomValue: { $rand: {} } } },
			{ $sort: { randomValue: 1 } },
			{ $limit: lim },
		]);

		if (!randomTips.length) {
			return res
				.status(200)
				.json({ message: "No ecofriendly tips found in the database" });
		}

		res.status(200).json({
			message: `${randomTips.length} Random Ecofriendly Tips`,
			data: randomTips,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

export {
	ecofriendlyTipsTest,
	createMultipleEcofriendlyTips,
	getRandomEcofriendlyTips,
	getRandomOneTip,
};
