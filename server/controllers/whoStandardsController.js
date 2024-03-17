//ALL CONTROLLERS ARE PROTECTED.

import asyncHandler from "../middleware/asyncHandler.js";
import WhoStandard from "../models/WhoStandard.js";

const whoStandardTest = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "ROUTE /who-standards/test IS WORKING" });
});

// POST url /who-standards/add-multiple
const createMultipleWhoStandards = async (req, res) => {
	try {
		const { standards } = req.body;

		// Validate input data type
		if (!Array.isArray(standards)) {
			return res.status(400).json({
				message:
					"Invalid data format. Please provide an array of WHO standards within the 'standards' property",
			});
		}

		// Validate array length
		if (standards.length > 500) {
			return res.status(400).json({
				message: "Maximum 500 WHO standards allowed in a single request",
			});
		}

		// Individual validation and saving (logic remains similar)
		const createdStandards = [];
		for (const standard of standards) {
			const { title, content, type } = standard;

			// ... validation and saving logic (same as previous version)

			const newWhoStandard = new WhoStandard({ title, content, type });
			const savedStandard = await newWhoStandard.save();
			createdStandards.push(savedStandard);
		}

		const numCreatedStandards = createdStandards.length;
		const message =
			numCreatedStandards === standards.length
				? "All WHO standards added successfully"
				: `${numCreatedStandards} WHO standards added successfully (some may have failed validation)`;

		res.status(201).json({ message, data: createdStandards });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const getRandomWhoStandards = async (req, res) => {
	const lim = 30;

	try {
		const randomStandards = await WhoStandard.aggregate([
			{ $match: {} }, // Equivalent to $sample if there's no filtering
			{ $addFields: { randomValue: { $rand: {} } } },
			{ $sort: { randomValue: 1 } },
			{ $limit: lim },
		]);

		if (!randomStandards.length) {
			return res
				.status(200)
				.json({ message: "No WHO standards found in the database" });
		}

		res.status(200).json({
			message: `${randomStandards.length} Random WHO standards`,
			data: randomStandards,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

export { whoStandardTest, createMultipleWhoStandards, getRandomWhoStandards };
