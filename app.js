const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const fs = require('fs')
const path = require('path')
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());


app.use(logger("combined", { stream: accessLogStream }), (req, res, next) => {
  next();
});
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);
app.use((err, req, res, next) => {
  const { status = 500, message = "Oops srver error! " } = err;
  
  res.status(status).json({ message});
});

module.exports = app;
