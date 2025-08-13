import express from "express";
import userRoutes from "./src/user/userRoute.ts"; // adjust path

const router = express.Router();

// Mount user routes under '/api/users'
router.use("/users", userRoutes);


// If you have other route groups, mount them here too
// router.use("/api/products", productRoutes);

export default router;

