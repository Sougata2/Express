import express, { request, response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
const loggingMiddleWare = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};
// app.use(loggingMiddleWare); // middleWare using globaly

const resolveIndexByUserId = (request, response, next) => {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id == parsedId);
  if (findUserIndex == -1) return response.sendStatus(404);
  request.findUserIndex = findUserIndex;
  next();
};

const mockUsers = [
  { id: 1, username: "admin", displayName: "Admin" },
  { id: 2, username: "anson", displayName: "Anson" },
  { id: 3, username: "jonson", displayName: "Jonson" },
  { id: 4, username: "manson", displayName: "Manson" },
  { id: 5, username: "tenson", displayName: "Tenson" },
  { id: 6, username: "jay", displayName: "Jay" },
];

// multiple middleWare for handling a request
app.get(
  "/",
  (request, response, next) => {
    console.log("BASE URL!");
    next();
  },
  function (request, response) {
    response.status(201).send({ msg: "Api" });
  }
);

// app.get("/", loggingMiddleWare, function (request, response) {
//   // middleware using for specific function
//   response.status(201).send({ msg: "Api" });
// });

app.get("/api/users", function (request, response) {
  const {
    query: { filter, value },
  } = request;
  if (filter && value)
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );
  return response.send(mockUsers);
});

app.get("/api/products", function (request, response) {
  response.send([
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
  ]);
});

// using multiple middleWare in app.use() method.
app.use(loggingMiddleWare, function (request, response, next) {
  console.log("Finished Logging!");
  next();
});

app.get("/api/users/:id", function (request, response) {
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId))
    return response.status(400).send({ msg: "Bad Request. Invalid ID" });
  const findUser = mockUsers.find((user) => user.id == parsedId);
  if (!findUser) return response.status(404);
  return response.send(findUser);
});

app.post("/api/users", function (request, response) {
  const { body } = request;
  const newUser = {
    id: mockUsers[mockUsers.length - 1].id + 1,
    ...body,
  };
  mockUsers.push(newUser);
  return response.status(200).send({ msg: "User added!", newUser: [newUser] });
});

// app.use(loggingMiddleWare); // now middleWare will be used for below request.
app.put("/api/users/:id", resolveIndexByUserId, function (request, response) {
  const { body, findUserIndex } = request;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

app.patch("/api/users/:id", function (request, response) {
  const {
    body,
    params: { id },
  } = request;
  const parsedId = Number(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id == parsedId);
  if (findUserIndex == -1) return response.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return response.sendStatus(200);
});

app.delete("/api/users/:id", function (request, response) {
  const {
    params: { id },
  } = request;
  const parsedId = Number(id);
  if (isNaN(parsedId)) return response.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return response.sendStatus(400);
  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

app.listen(PORT, function () {
  console.log(`Running on Port ${PORT}`);
});
