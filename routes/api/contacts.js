const express = require("express");
const { validateBody, isLogin } = require("../../helpers");
const schema = require('../../models/contact')
const router = express.Router();
const ctrl = require('../../controllers/contacts-controllers')


router.get("/", isLogin, ctrl.getAllContontacts);

router.get("/:id", isLogin, ctrl.getContactById);

router.post("/", isLogin, validateBody(schema.contactAddSchema), ctrl.addContact);


router.put("/:id",isLogin, validateBody(schema.contactAddSchema), ctrl.updateContactById);

router.patch("/:id/favorite",isLogin, validateBody(schema.updateFavoriteSchema), ctrl.updateFavoriteById)

router.delete("/:id", isLogin, ctrl.deleteContactById);

module.exports = router;
