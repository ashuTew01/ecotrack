//ALL CONTROLLERS IN THIS ROUTE ARE PROTECTED IN THE MAIN.JS FILE

//prefix   /carbon

import express from "express";
import {
	carbonTest,
	getCarbonStats,
	getPrevTwelveMonthData,
	saveCarbonData,
} from "../controllers/carbonController.js";

const router = express.Router();

router.get("/test", carbonTest);
router.get("/get-stats/:year/:month", getCarbonStats);
router.post("/save", saveCarbonData); //for a particular month or year
router.get("/get-twelve-month", getPrevTwelveMonthData);

export default router;
