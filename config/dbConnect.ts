import mongoose from "mongoose";
import { envVariables } from "../utils/envProvider.ts";

export const connectDB = async (): Promise<void> => {
  try {
    if (!envVariables.dbUri) {
      throw new Error("❌ DB_URI is not defined in environment variables");
    }

    await mongoose.connect(envVariables.dbUri, {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to Railway MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};
