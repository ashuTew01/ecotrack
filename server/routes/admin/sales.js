import express from "express";
import { getSales } from "../../controllers/admin/sales.js";

const router = express.Router();

router.get("/sales", getSales);

export default router;
