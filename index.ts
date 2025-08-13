import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes.ts";
import { sendResponse } from "./utils/responseHandler.ts";
import { connectDB } from "./src/db/dbConnect.ts";
import { globalErrorHandler } from "./utils/gobalErronHanlder.ts";

dotenv.config();

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // your frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Mount all routes under /v1/api prefix
app.use("/v1/api", routes);

// Connect to Railway MongoDB
connectDB();

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
