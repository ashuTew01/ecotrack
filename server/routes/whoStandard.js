//ALL CONTROLLERS IN THIS ROUTE ARE PROTECTED IN THE MAIN.JS FILE. NO NEED TO PROTECT SEPARATELY.

//prefix   /who-standards

import express from "express";
import {
	createMultipleWhoStandards,
	getRandomWhoStandards,
	whoStandardTest,
} from "../controllers/whoStandardsController.js";

const router = express.Router();

router.get("/test", whoStandardTest);
router.post("/create-multiple", createMultipleWhoStandards);
router.get("/get-random", getRandomWhoStandards);

export default router;
