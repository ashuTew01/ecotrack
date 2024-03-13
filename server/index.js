import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/admin/main.js"

//data imports
import User from "./models/admin/User.js"
import Product from "./models/admin/Product.js"
import ProductStat from "./models/admin/ProductStat.js"
import Transaction from "./models/admin/Transaction.js";
import OverallStat from "./models/admin/OverallStat.js";
import AffiliateStat from "./models/admin/AffiliateStat.js";
import { dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat } from "./data/index.js"

// CONFIGURATION
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

// Routes
app.use("/admin", adminRoutes);


//Connecting to database
const PORT = process.env.PORT || 3011;
connectDB();

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);

  // ONLY 1 TIME . MOCK DATA INSERTION
  // User.insertMany(dataUser);

  // Product.insertMany(dataProduct);
  // ProductStat.insertMany(dataProductStat);

  // Transaction.insertMany(dataTransaction);

  // OverallStat.insertMany(dataOverallStat);
  // AffiliateStat.insertMany(dataAffiliateStat);
})


