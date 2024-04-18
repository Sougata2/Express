import { Router } from "express";
import {
  createUserValidationSchema,
  getUsersValidationSchema,
} from "../utils/validationSchemas.mjs";
import { mockUsers } from "../utils/constants.mjs";
import { checkSchema, validationResult, matchedData } from "express-validator";
import { resolveIndexByUserId } from "../utils/middleware.mjs";

const userRouter = Router();
userRouter.get(
  "/api/users",
  checkSchema(getUsersValidationSchema),
  function (request, response) {
    const result = validationResult(request);
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });

    const data = matchedData(request);
    const { filter, value } = data;

    if (filter && value)
      return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
      );
    return response.send(mockUsers);
  }
);

userRouter.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  function (request, response) {
    const result = validationResult(request);
    console.log(result);
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });
    const data = matchedData(request);
    const newUser = {
      id: mockUsers[mockUsers.length - 1].id + 1,
      ...data,
    };
    mockUsers.push(newUser);
    return response
      .status(200)
      .send({ msg: "User added!", newUser: [newUser] });
  }
);

userRouter.get(
  "/api/users/:id",
  resolveIndexByUserId,
  function (request, response) {
    const { findUserIndex } = request;
    const findUser = mockUsers[findUserIndex];
    if (!findUser) return response.status(404);
    return response.send(findUser);
  }
);

userRouter.put(
  "/api/users/:id",
  resolveIndexByUserId,
  function (request, response) {
    const { body, findUserIndex } = request;
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
    return response.sendStatus(200);
  }
);

userRouter.patch(
  "/api/users/:id",
  resolveIndexByUserId,
  function (request, response) {
    const { body, findUserIndex } = request;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
    return response.sendStatus(200);
  }
);

userRouter.delete(
  "/api/users/:id",
  resolveIndexByUserId,
  function (request, response) {
    const { findUserIndex } = request;
    mockUsers.splice(findUserIndex, 1);
    return response.sendStatus(200);
  }
);

export default userRouter;
