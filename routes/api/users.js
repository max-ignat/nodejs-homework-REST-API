const express = require("express");
const { validateBody , isLogin} = require("../../helpers");
const router = express.Router();
const upload = require ("../../helpers/upload.js")
const schema = require("../../models/user");
const ctrl = require('../../controllers/users-controllers')

router.post("/register", validateBody(schema.userRegisterSchema),  ctrl.register);

router.post("/login",validateBody(schema.userLoginSchema),  ctrl.login) 

router.post("/logout", isLogin, ctrl.logout)

router.get("/current" , isLogin, ctrl.getCurrent);
router.patch('/avatars', isLogin, upload.single('avatar'), ctrl.upload)
module.exports = router;