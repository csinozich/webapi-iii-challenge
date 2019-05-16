const express = "express";

const server = express();
const postRouter = require("./posts/postRouter.js");
const userRouter = require("./users/userRouter.js");

server.use(express.json());
server.use(logger);
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

server.use((error, req, res, next) => {
  res.status(500).json({
    message: "nope",
    error
  });
});

module.exports = server;
