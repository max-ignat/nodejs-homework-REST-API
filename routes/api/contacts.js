const express = require("express");
const { validateBody } = require('../../helpers')
const schema = require('../../schema/contactSchema')
const router = express.Router();
const ctrl = require('../../controllers/contacts-controllers')

router.get("/", ctrl.getAllContontacts);

// router.get("/:id", ctrl.getContactById);

// router.post("/", validateBody(schema.contactSchema) ,ctrl.addContact);
// router.put("/:id",validateBody(schema.contactSchema), ctrl.updateContactById);

// router.delete("/:id", ctrl.deleteContactById);

module.exports = router;
