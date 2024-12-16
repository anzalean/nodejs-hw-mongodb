import { ContactsCollection } from '../db/models/contact.js';

export async function getAllContacts() {
  return await ContactsCollection.find();
}

export async function getContactById(contactId) {
  return await ContactsCollection.findById(contactId);
}
