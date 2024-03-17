//ALL CONTROLLERS IN THIS ROUTE ARE PROTECTED IN THE MAIN.JS FILE. NO NEED TO PROTECT SEPARATELY.

//prefix   /eco-tips

import express from "express";
import {
	createMultipleEcofriendlyTips,
	getRandomEcofriendlyTips,
	ecofriendlyTipsTest,
} from "../controllers/ecofriendlyTipsController.js";

const router = express.Router();

router.get("/test", ecofriendlyTipsTest);
router.post("/create-multiple", createMultipleEcofriendlyTips);
router.get("/get-random", getRandomEcofriendlyTips);

export default router;
