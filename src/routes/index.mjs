import { Router } from "express";
import userRouter from "./users.mjs";
import productRouter from "./products.mjs";

const router = Router();

// routes for user GET, POST, PUT, PATCH, DELETE requests
router.use(userRouter);

// routest for products GET, POST, PUT, PATCH, DELETE requests
router.use(productRouter);

export default router;
