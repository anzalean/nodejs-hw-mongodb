import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({userId, page, perPage, sortOrder = SORT_ORDER.ASC,
  sortBy = '_id', }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId });
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
  ContactsCollection.findOne({ _id: contactId, userId });

export const postContact = (contactData) =>
  ContactsCollection.create(contactData);

export const patchContact = (contactId, userId, contactData) =>
  ContactsCollection.findOneAndUpdate({ _id: contactId, userId }, contactData, {
    new: true,
  });

export const deleteContact = (contactId, userId) =>
  ContactsCollection.findOneAndDelete({ _id: contactId, userId });
