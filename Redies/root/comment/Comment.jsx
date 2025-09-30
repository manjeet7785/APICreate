const Express = require("express");
// const bcrypt = require("bcrypt");
// const valid = require("../Checker.jsx")
// const Midd = require("../Midd.jsx")

const commentRouter = Express.Router();

commentRouter.get("/", (req, res) => {
  res.send("Comment");
})

commentRouter.patch('/:id', (req, res) => {
  res.send("comment the line")
})

module.exports = commentRouter;