//ALL CONTROLLERS IN THIS ROUTE ARE PROTECTED IN THE MAIN.JS FILE. NO NEED TO PROTECT SEPARATELY.

//prefix   /news

import express from "express";

// import { authorizeUser } from "../middleware/authMiddleware.js";
import {
	getGlobalNews,
	getLocalNews,
	getTopHeadlines,
	newsTest,
} from "../controllers/newsController.js";

const router = express.Router();

router.get("/test", newsTest);
router.get("/get-top-headlines", getTopHeadlines);
router.get("/get-local-news", getLocalNews);
router.get("/get-global-news", getGlobalNews);

export default router;
