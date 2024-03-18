//ALL CONTROLLERS ARE PROTECTED.

import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/User.js";
import { isValidDate } from "../utils/validDateChecker.js";
import { standardWaterValues } from "../utils/standardVals.js";

const userDataTest = asyncHandler(async (req, res) => {
	res.status(200).json({ message: "ROUTE /userdata/test IS WORKING" });
});

const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	const { password, ...userWithoutPassword } = user.toObject();

	res.status(200).json({ user: userWithoutPassword });
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

		// Check if the year and month are valid
		if (!isValidDate(year, month)) {
			return res.status(400).json({ message: "Invalid year or month" });
		}

		// Find the user by ID
		const user = await User.findById(req.user._id);

		// If user not found, return 404
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Find the water usage data for the specified year and month
		const waterData = user.waterUsage.find(
			(data) => data.year == year && data.month == month
		);

		// If water usage data not found, return 404
		if (!waterData) {
			return res.status(404).json({
				message: "Water usage data not found for the specified year and month",
			});
		}

		// Calculate total water usage by summing all categories
		const totalWaterUsage = Object.values(waterData.categories).reduce(
			(acc, val) => acc + val,
			0
		);

		// Calculate total standard values for comparison
		const totalStandardValues = Object.values(standardWaterValues).reduce(
			(acc, val) => acc + val,
			0
		);

		// Determine if water usage is good or bad compared to standard values
		const isGood = totalStandardValues - totalWaterUsage > 0;

		// Calculate percentage increase or decrease compared to standard values
		const percentageIncDec =
			(Math.abs(totalStandardValues - totalWaterUsage) / totalStandardValues) *
			100;

		// Send response with water usage data and statistics
		res.status(200).json({
			waterData,
			totalWaterUsage,
			totalStandardValues,
			isGood,
			percentageIncDec,
		});
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

const getPrevTwelveMonthWaterData = async (req, res) => {};

//***********************WATER USAGE END*************************************************************** */

export {
	userDataTest,
	getUser,
	saveWaterUsageData,
	getDetailedWaterUsageStats,
	getWaterUsageStats,
	getPrevTwelveMonthWaterData,
};
