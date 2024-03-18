import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

import { generalRouter } from "./routes/main.js";

//data imports

// CONFIGURATION
const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/", generalRouter);

//Connecting to database
const PORT = process.env.PORT || 3011;
connectDB();

app.listen(PORT, () => {
	console.log("Server started on port " + PORT);
});
