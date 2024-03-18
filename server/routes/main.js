import express from "express";

import authRoutes from "./auth.js";
import userDataRoutes from "./userdata.js";
import newsRoutes from "./news.js";
import whoStandardRoutes from "./whoStandard.js";
import ecofriendlyTipRoutes from "./ecofriendlyTip.js";
import carbonRoutes from "./carbon.js";

import { authorizeUser } from "../middleware/authMiddleware.js";

const generalRouter = express.Router();

generalRouter.use("/auth", authRoutes); //prefix "/"
generalRouter.use("/userdata", authorizeUser, userDataRoutes);
generalRouter.use("/news", authorizeUser, newsRoutes);
generalRouter.use("/who-standards", authorizeUser, whoStandardRoutes);
generalRouter.use("/eco-tips", authorizeUser, ecofriendlyTipRoutes);
generalRouter.use("/carbon", authorizeUser, carbonRoutes);

export { generalRouter };
