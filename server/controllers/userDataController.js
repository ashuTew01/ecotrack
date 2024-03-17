//ALL CONTROLLERS ARE PROTECTED.

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import { isValidDate } from "../utils/validDateChecker.js";
import { standardWaterValues } from "../utils/standardVals.js";

const userDataTest = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "ROUTE /userdata/test IS WORKING" });
});

//***********************WATER USAGE START************************************************************* */

// POST url /userdata/water-usage/save
const saveWaterUsageData = async (req, res) => {
	try {
		const {
			year,
			month,
			drinking,
			cooking,
			bathing,
			clothWashing,
			utensilsWashing,
			houseWashing,
			waterClosetsFlushing,
			others,
		} = req.body;

		if (!isValidDate(year, month)) {
			return res.status(400).json({ message: "Invalid year or month" });
		}

		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const existingDataIndex = user.waterUsage.findIndex(
			(data) => data.year === year && data.month === month
		);

		if (existingDataIndex !== -1) {
			// update existing water usage data
			user.waterUsage[existingDataIndex].categories = {
				drinking,
				cooking,
				bathing,
				clothWashing,
				utensilsWashing,
				houseWashing,
				waterClosetsFlushing,
				others,
			};
		} else {
			// add new water usage data
			user.waterUsage.push({
				year,
				month,
				categories: {
					drinking,
					cooking,
					bathing,
					clothWashing,
					utensilsWashing,
					houseWashing,
					waterClosetsFlushing,
					others,
				},
			});
		}

		await user.save();

		res.status(200).json({ message: "Water usage data saved successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// GET url /userdata/water-usage/get-stats
const getWaterUsageStats = async (req, res) => {
	try {
		const { year, month } = req.params;

		// no future mate
		if (!isValidDate(year, month)) {
			return res.status(400).json({ message: "Invalid year or month" });
		}

		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const waterUsageData = user.waterUsage.find(
			(data) => data.year == year && data.month == month
		);

		if (!waterUsageData) {
			return res.status(404).json({
				message: "Water usage data not found for the specified year and month",
			});
		}

		const totalWaterUsedByPerson = Object.values(
			waterUsageData.categories
		).reduce((acc, val) => acc + val, 0);

		const totalStandardValues = Object.values(standardWaterValues).reduce(
			(acc, val) => acc + val,
			0
		);

		res
			.status(200)
			.json({ waterUsageData, totalWaterUsedByPerson, totalStandardValues });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

// GET url /userdata/water-usage/get-detailed-stats
const getDetailedWaterUsageStats = async (req, res) => {
	try {
		const { year, month } = req.params;

		//dont allow for future dates
		if (!isValidDate(year, month)) {
			return res.status(400).json({ message: "Invalid year or month" });
		}

		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Find the water usage data for the specified year and month
		const waterUsageData = user.waterUsage.find(
			(data) => data.year == year && data.month == month
		);

		if (!waterUsageData) {
			return res.status(404).json({
				message: "Water usage data not found for the specified year and month",
			});
		}

		// comparing user water usage with the standard values

		let waterSaved = 0;
		let waterWasted = 0;
		let isExtra = {};

		for (const category in waterUsageData.categories) {
			const userUsage = waterUsageData.categories[category];
			const standardUsage = standardWaterValues[category];
			const difference = standardUsage - userUsage;
			if (difference > 0) {
				waterSaved += difference;
				isExtra[category] = false;
			} else if (difference < 0) {
				waterWasted += Math.abs(difference);
				isExtra[category] = true;
			}
		}

		var isOverallWaterSaved = waterSaved - waterWasted >= 0;
		const peopleFed = Math.abs(waterSaved - waterWasted) / 2.5; // assume 2.5 liters water/ person per day

		res.status(200).json({
			waterSaved,
			waterWasted,
			peopleFed,
			isExtra,
			isOverallWaterSaved,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

//***********************WATER USAGE END*************************************************************** */

export {
	userDataTest,
	saveWaterUsageData,
	getDetailedWaterUsageStats,
	getWaterUsageStats,
};
