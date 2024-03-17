//prefix   /auth

import express from "express";
import {
	authPostTest,
	authTest,
	createUser,
	loginUser,
	logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", createUser);
router.post("/logout", logoutUser);
router.get("/test", authTest);
router.post("/postTest", authPostTest);

export default router;
