//ALL CONTROLLERS IN THIS ROUTE ARE ***NOT***** PROTECTED IN THE MAIN.JS FILE. PROTECT SEPARATELY.

//prefix   /news

import express from "express";
import {
	getDetailedWaterUsageStats,
	getWaterUsageStats,
	saveWaterUsageData,
	userDataTest,
} from "../controllers/userDataController.js";

import { authorizeUser } from "../middleware/authMiddleware.js";
import { getNewsArticles, newsTest } from "../controllers/newsController.js";

const router = express.Router();

router.get("/test", newsTest);
router.get("/get-news-articles", getNewsArticles);

export default router;
