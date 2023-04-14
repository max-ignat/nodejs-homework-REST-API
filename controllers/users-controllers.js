const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// console.log(process.env)

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "e-mail already in use");
  }

  const createHashPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: createHashPass });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "22h" });
await User.findByIdAndUpdate(user._id, {token})
  res.json({ token });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({ email, name });
}
const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id,{token:""})

  res.json({
    message: "Bye! Logout success"
  })
}
  (module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
  });
