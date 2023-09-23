const { HttpError, ctrlWrapper } = require('../helpers')

const Contact = require('../models/contact')

const getAll = async (req, res) => {
    const { _id: owner } = req.user
    const { page = 1, limit = 20 } = req.query
    const skip = (page - 1) * limit
    const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit })
    res.json(contacts)
}

const getById = async (req, res) => {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)
    if (!contact) {
        throw HttpError(404, "Not found")
    }
    res.json(contact)
}

const add = async (req, res) => {
    const { _id: owner } = req.user
    const result = await Contact.create({ ...req.body, owner })
    res.status(201).json(result)
}

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw HttpError(400, "Not found");
    }
    res.json(result)
}

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
    if (!result) {
        throw HttpError(400, "Not found");
    }
    res.json(result)
}

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);

    if (!result) {
        throw HttpError(404, "Not found")
    }
    res.json({
        message: "Contact deleted"
    })
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteById: ctrlWrapper(deleteById)
}