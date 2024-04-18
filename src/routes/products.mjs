import { Router } from "express";
import { mockProducts } from "../utils/constants.mjs";

const productRouter = Router();

productRouter.get("/api/products", function (request, response) {
  return response.status(200).send(mockProducts);
});

export default productRouter;
