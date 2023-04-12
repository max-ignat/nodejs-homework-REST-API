const express = require("express");
const { validateBody } = require("../../helpers");
const router = express.Router();

const schema = require("../../models/user");
const ctrl = require('../../controllers/users-controllers')

router.post("/register", validateBody(schema.userRegisterSchema),  ctrl.register);

router.post("/login",validateBody(schema.userLoginSchema),  ctrl.login) 

// router.post("/logout",)

// router.get("/current");

module.exports = router;