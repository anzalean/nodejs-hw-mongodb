import createError from 'http-errors';
import { contactsService } from '../services/contacts.js';

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.getAllContacts();
    res.json({ status: 200, data: contacts });
  } catch (err) {
    next(err);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params.contactId);
    if (!contact) throw createError(404, 'Contact not found');
    res.json({ status: 200, data: contact });
  } catch (err) {
    next(err);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await contactsService.createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await contactsService.updateContact(
      req.params.contactId,
      req.body
    );
    if (!updatedContact) throw createError(404, 'Contact not found');
    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const result = await contactsService.deleteContact(req.params.contactId);
    if (!result) throw createError(404, 'Contact not found');
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
