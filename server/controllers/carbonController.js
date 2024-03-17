//carbon footprint is referred to as carbon for simplicity.

import asyncHandler from "../middleware/asyncHandler.js";
import axios from "axios";
import { standardCarbonValues } from "../utils/standardVals.js";
import { isValidDate } from "../utils/validDateChecker.js";

import User from "../models/User.js";

const carbonTest = asyncHandler(async (req, res) => {
	res.status(200).json({ message: `ROUTE carbonTest IS WORKING` });
});

const saveCarbonData = async (req, res) => {
	try {
		const {
			year,
			month,
			mileage,
			isPublicTransport,
			numPassengers,
			distTravelled,
			electricityUsage,
			others,
		} = req.body;
		// const passengers = isPublicTransport ? numPassengers : 1;
		const passengers = 1;
		const monthlyDistance = distTravelled * 30;
		const transport = ((monthlyDistance / mileage) * 2.37) / passengers;
		const electricity = electricityUsage * 0.83;
		if (!isValidDate(year, month)) {
			return res.status(400).json({ message: "Invalid year or month" });
		}

		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const existingDataIndex = user.carbonFootprint.findIndex(
			(data) => data.year === year && data.month === month
		);
		console.log({ transport, electricity, others });
		if (existingDataIndex !== -1) {
			// update existing carbon data
			user.carbonFootprint[existingDataIndex].categories = {
				transport,
				electricity,
				others,
			};
		} else {
			// add new water carbon data
			user.carbonFootprint.push({
				year,
				month,
				categories: {
					transport,
					electricity,
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

const getCarbonStats = async (req, res) => {
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

		const carbonData = user.carbonFootprint.find(
			(data) => data.year == year && data.month == month
		);

		if (!carbonData) {
			return res.status(404).json({
				message: "Water usage data not found for the specified year and month",
			});
		}

		const totalCarbonByPerson = Object.values(carbonData.categories).reduce(
			(acc, val) => acc + val,
			0
		);

		const totalStandardValues = Object.values(standardCarbonValues).reduce(
			(acc, val) => acc + val,
			0
		);
		const isGood = totalStandardValues - totalCarbonByPerson > 0;
		const percentageIncDec =
			(Math.abs(totalStandardValues - totalCarbonByPerson) /
				totalStandardValues) *
			100;
		res.status(200).json({
			carbonData,
			totalCarbonByPerson,
			totalStandardValues,
			isGood,
			percentageIncDec,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const getPrevTwelveMonthData = asyncHandler(async (req, res) => {
	try {
		const userId = req.user._id;

		// Fetch user data from the database
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1;

		let startYear = currentYear;
		let startMonth = currentMonth;

		const monthlyCarbonFootprints = {};

		for (let i = 0; i < 12; i++) {
			const carbonData = user.carbonFootprint.find(
				(data) => data.year === startYear && data.month === startMonth
			);

			if (carbonData) {
				const totalCarbonFootprint = Object.values(
					carbonData.categories
				).reduce((acc, val) => acc + val, 0);
				monthlyCarbonFootprints[`${startYear}-${startMonth}`] =
					totalCarbonFootprint;
			} else {
				monthlyCarbonFootprints[`${startYear}-${startMonth}`] = 0;
			}

			// Update startYear and startMonth for the next iteration
			if (startMonth === 1) {
				startYear--;
				startMonth = 12;
			} else {
				startMonth--;
			}
		}

		// Send the monthly carbon footprints to the frontend
		res.status(200).json({ monthlyCarbonFootprints });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
});

export { carbonTest, getCarbonStats, getPrevTwelveMonthData, saveCarbonData };
