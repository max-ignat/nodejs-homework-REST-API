
const { ctrlWrapper, HttpError } = require("../helpers");

const { Contact } = require("../models/contact");

const getAllContontacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById =  async (req, res, ) => {

        const { id } = req.params;
        const result = await Contact.findById({_id: id});
        if (!result) {
          throw HttpError(404);
        }
        res.json(result);

    };

const addContact = async (req, res, ) => {
        const result = await Contact.create(req.body);
        res.status(201).json(result);

    };

const updateContactById = async (req, res, ) => {

        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new : true});
        res.status(200).json(result);

    };


    const updateFavoriteById = async (req, res) => {
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
      res.status(200).json(result);
};
    
const deleteContactById = async (req, res, ) => {

        const { id } = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if (!result) {
          throw HttpError(404);
        }
        res.json({ message: "contact deleted" });

    };



module.exports = {
  getAllContontacts: ctrlWrapper(getAllContontacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};
