import express from "express";
import router from "./routes/index.mjs";

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());

const loggingMiddleWare = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};
// app.use(loggingMiddleWare); // middleWare using globaly

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

// using multiple middleWare in app.use() method.
app.use(loggingMiddleWare, function (request, response, next) {
  console.log("Finished Logging!");
  next();
});

app.use(router);

app.listen(PORT, function () {
  console.log(`Running on Port ${PORT}`);
});
