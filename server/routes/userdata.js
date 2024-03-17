//ALL CONTROLLERS IN THIS ROUTE ARE PROTECTED IN THE MAIN.JS FILE

//prefix   /userdata

import express from "express";
import {
	getDetailedWaterUsageStats,
	getWaterUsageStats,
	saveWaterUsageData,
	userDataTest,
} from "../controllers/userDataController.js";

import { authorizeUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", userDataTest);
router.post("/water-usage/save", saveWaterUsageData);
router.get("/water-usage/get-stats/:year/:month", getWaterUsageStats);
router.get(
	"/water-usage/get-detailed-stats/:year/:month",
	getDetailedWaterUsageStats
);

export default router;
