const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const fs = require('fs')
const path = require('path')
const contactsRouter = require("./routes/api/contacts");
// const contacts = require("./models/contacts.json");
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

app.use((err, req, res, next) => {
  // const { status = 500, message = "Server message" } = error;
  res.status(500).json({ message: err.message });
});

module.exports = app;
