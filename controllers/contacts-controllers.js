
const { ctrlWrapper, HttpError } = require("../helpers");

const { Contact } = require("../models/contact");

const getAllContontacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");
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

const addContact = async (req, res,) => {
  const { _id: owner } = req.user;
        const result = await Contact.create({...req.body, owner});
        res.status(201).json(result);

    };

const updateContactById = async (req, res, ) => {

        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, {new : true});
        res.status(200).json(result);

    };


    const updateFavoriteById = async (req, res) => {
      const { id } = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
      if (!result) {
        throw HttpError(404);
      }
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
