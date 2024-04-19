import { Router } from "express";
import userRouter from "./users.mjs";
import productRouter from "./products.mjs";

const routes = Router();

// routes for user GET, POST, PUT, PATCH, DELETE requests
routes.use(userRouter);

// routest for products GET, POST, PUT, PATCH, DELETE requests
routes.use(productRouter);

export default routes;
