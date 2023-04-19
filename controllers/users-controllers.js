const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");
const path = require('path')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

require("dotenv").config();
const fs = require("fs/promises");
// const gravatar = require("gravatar")
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

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const upload = async (req, res,) => {
  const { path: tempUpload, filename } = req.file;
  const resultUpload = path.join(avatarDir, filename);
  try {
    await fs.rename(tempUpload, resultUpload);
    const avatar = path.join("public", "avatars", filename)
    const newUser = {
      _id: uuid(),
      ...req.body,
      avatar,
   }
    // console.log(gravatar)
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error " });
  }
};

  module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    upload: ctrlWrapper(upload),
  };
