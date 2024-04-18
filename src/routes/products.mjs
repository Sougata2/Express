import { Router } from "express";
import { mockProducts, mockProductsSigned } from "../utils/constants.mjs";

const productRouter = Router();

productRouter.get("/api/products", function (request, response) {
  // console.log(request.headers.cookie);
  // console.log(request.cookies);
  // console.log(request.signedCookies.key);
  if (request.signedCookies.key && request.signedCookies.key === "value")
    return response.status(200).send(mockProductsSigned);
  if (request.cookies.hello && request.cookies.hello === "world")
    return response.status(200).send(mockProducts);
  return response.status(403).send({
    msg: "Sorry, cookie time expired or you need the correct cookie",
  });
});

export default productRouter;
