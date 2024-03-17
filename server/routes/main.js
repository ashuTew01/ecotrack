import express from "express";
import clientRoutes from "./admin/client.js";
import generalRoutes from "./admin/general.js";
import managementRoutes from "./admin/management.js";
import salesRoutes from "./admin/sales.js";

import authRoutes from "./auth.js";
import userDataRoutes from "./userdata.js";
import newsRoutes from "./news.js";

import { authorizeUser } from "../middleware/authMiddleware.js";

const adminRouter = express.Router();
const generalRouter = express.Router();

// // Middleware for the '/admin' route
// adminRouter.use((req, res, next) => {
//   // Any middleware specific to the '/admin' route can be added here
//   console.log('Admin middleware');
//   next();
// });

adminRouter.use("/client", clientRoutes);
adminRouter.use("/general", generalRoutes);
adminRouter.use("/management", managementRoutes);
adminRouter.use("/sales", salesRoutes);

generalRouter.use("/auth", authRoutes); //prefix "/"
generalRouter.use("/userdata", authorizeUser, userDataRoutes);
generalRouter.use("/news", newsRoutes);

export { adminRouter, generalRouter };
