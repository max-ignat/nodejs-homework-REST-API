const { User } = require("../models/user");
const { ctrlWrapper, HttpError, sendEmail } = require("../helpers");
const path = require('path')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

require("dotenv").config();
const fs = require("fs/promises");
const gravatar = require("gravatar")
const { SECRET_KEY , BASE_URL} = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "e-mail already in use");
  }
  const avatarURL = gravatar.url(email)
  const createHashPass = await bcrypt.hash(password, 10);

  const verificationCode = uuid();

  

  const newUser = await User.create({ ...req.body, password: createHashPass , avatarURL, verificationCode});

  const verifyEmail = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    
  });
};

const verify = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) {
    throw HttpError(404, "Email not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });
  // res.redirect("sitename.com/?token=token")
  res.json({
    message: "Email verify success",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Email resend success",
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
  const {_id} = req.user
  const { path: tempUpload, filename } = req.file;
  const avatarName = `${_id}_${filename}`
  const resultUpload = path.join(avatarDir, avatarName);
  try {
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);
    await User.findOneAndUpdate(_id, { avatarURL });
res.json({avatarURL})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error " });
  }
};

  module.exports = {
    register: ctrlWrapper(register),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    upload: ctrlWrapper(upload),
  };
