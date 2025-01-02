import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({userId, page, perPage, sortOrder = SORT_ORDER.ASC,
  sortBy = '_id', }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder })
  .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (contactId, userId) =>
  ContactsCollection.findById({ _id: contactId, userId });

export const postContact = (contactData) =>
  ContactsCollection.create(contactData);

export const deleteContact = (contactId, userId) =>
  ContactsCollection.findByIdAndDelete( {_id: contactId, userId });

export const patchContact = (contactId, userId, contactData) =>
  ContactsCollection.findByIdAndUpdate({ _id: contactId, userId }, contactData, {
    new: true,
  });
