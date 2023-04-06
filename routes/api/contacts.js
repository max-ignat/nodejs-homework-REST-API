const express = require("express");
const { validateBody } = require('../../helpers')
const schema = require('../../models/contact')
const router = express.Router();
const ctrl = require('../../controllers/contacts-controllers')

router.get("/", ctrl.getAllContontacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schema.contactAddSchema), ctrl.addContact);

router.put("/:id",validateBody(schema.contactAddSchema), ctrl.updateContactById);

router.delete("/:id", ctrl.deleteContactById);

module.exports = router;
