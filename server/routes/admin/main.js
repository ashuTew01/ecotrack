import express from "express";
import clientRoutes from "./client.js"
import generalRoutes from "./general.js"
import managementRoutes from "./management.js"
import salesRoutes from "./sales.js"

const adminRouter = express.Router();

// // Middleware for the '/admin' route
// adminRouter.use((req, res, next) => {
//   // Any middleware specific to the '/admin' route can be added here
//   console.log('Admin middleware');
//   next();
// });




adminRouter.use('/client', clientRoutes);
adminRouter.use("/general", generalRoutes);
adminRouter.use("/management", managementRoutes);
adminRouter.use("/sales", salesRoutes);

export default adminRouter;