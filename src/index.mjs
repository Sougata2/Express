import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./strategies/local-strategy.mjs";

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
// Middleware for logging request.
const loggingMiddleWare = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

// Middleware to parse the cookies.
// app.use(cookieParser());  // for unsigned cookie
app.use(cookieParser("secret")); // for signed cookie
app.use(
  session({
    secret: "anson the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.post("/api/auth", passport.authenticate("local"), (request, response) => {
  return response.sendStatus(200);
});

app.get("/api/auth/status", (request, response) => {
  console.log(`Inside /auth/status endpoint`);
  console.log(request.user);
  if (request.user) return response.send(request.user);
  return response.sendStatus(401);
});

app.post("/api/auth/logout", function (request, response) {
  if (!request.user) return response.sendStatus(401);
  request.logOut((err) => {
    if (err) return response.sendStatus(400);
    return response.sendStatus(200);
  });
});

// multiple middleWare for handling a request
app.get(
  "/",
  (request, response, next) => {
    console.log("BASE URL!");
    next();
  },
  function (request, response) {
    response.cookie("hello", "world", { maxAge: 10000 });
    response.cookie("key", "value", { maxAge: 30000, signed: true });
    console.log(request.session);
    console.log(request.session.id);
    request.session.visited = true;
    response.status(201).send({ msg: "Api" });
  }
);

// app.post("/api/auth", (request, response) => {
//   const {
//     body: { username, password },
//   } = request;
//   const findUser = mockUsers.find((user) => user.username === username);
//   if (!findUser || findUser.password !== password)
//     return response.status(401).send({ msg: "BAD CREDENTIALS" });
//   request.session.user = findUser;
//   return response.status(200).send(findUser);
// });

// app.get("/api/auth/status", (request, response) => {
//   request.sessionStore.get(request.sessionID, (err, session) => {
//     console.log(session);
//   });
//   return request.session.user
//     ? response.status(200).send(request.session.user)
//     : response.status(401).send({ msg: "Not Authenticated" });
// });

// app.post("/api/cart", (request, response) => {
//   if (!request.session.user) return response.sendStatus(401);
//   const { body: item } = request;
//   const { cart } = request.session;
//   if (cart) {
//     cart.push(item);
//   } else {
//     request.session.cart = [item];
//   }
//   return response.status(201).send(item);
// });

app.get("/api/cart", (request, response) => {
  if (!request.session.user) return response.status(401);
  return response.send(request.session.cart ?? []);
});

// app.get("/", loggingMiddleWare, function (request, response) {
//   // middleware using for specific function
//   response.status(201).send({ msg: "Api" });
// });

// using multiple middleWare in app.use() method.
app.use(loggingMiddleWare, function (request, response, next) {
  console.log("Finished Logging!");
  next();
});

app.listen(PORT, function () {
  console.log(`Running on Port ${PORT}`);
});
