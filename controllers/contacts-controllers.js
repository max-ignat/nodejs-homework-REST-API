const { ctrlWrapper ,HttpError } = require("../helpers");
const contacts = require("../models/contact");



const getAllContontacts =async (req, res, ) => {

        const result = await contacts.listContacts();
        res.json(result);
     
    };


// const getContactById =  async (req, res, ) => {
      
//         const { id } = req.params;
//         const result = await contacts.getContactById(id);
//         if (!result) {
//           throw HttpError(404);
//         }
//         res.json(result);
      
//     };


// const addContact = async (req, res, ) => {
//         const result = await contacts.addContact(req.body);
//         res.status(201).json(result);
      
//     };


// const updateContactById = async (req, res, ) => {
      
//         const { id } = req.params;
//         const result = await contacts.updateContacts(id, req.body);
//         res.status(200).json(result);
      
//     };


// const deleteContactById = async (req, res, ) => {
      
//         const { id } = req.params;
//         const result = await contacts.removeContact(id);
//         if (!result) {
//           throw HttpError(404);
//         }
//         res.json({ message: "contact deleted" });
      
//     };


module.exports = {
  getAllContontacts: ctrlWrapper(getAllContontacts),
  // getContactById: ctrlWrapper(getContactById),
  // addContact: ctrlWrapper(addContact),
  // updateContactById: ctrlWrapper(updateContactById),
  // deleteContactById: ctrlWrapper(deleteContactById),
};
