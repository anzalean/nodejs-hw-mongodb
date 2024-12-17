const contacts = []; 

export const contactsService = {
  getAllContacts: async () => contacts,

  getContactById: async (id) => contacts.find((c) => c.id === id),

  createContact: async (data) => {
    const newContact = { id: Date.now().toString(), ...data };
    contacts.push(newContact);
    return newContact;
  },

  updateContact: async (id, data) => {
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) return null;
    contacts[index] = { ...contacts[index], ...data };
    return contacts[index];
  },

  deleteContact: async (id) => {
    const index = contacts.findIndex((c) => c.id === id);
    if (index === -1) return null;
    contacts.splice(index, 1);
    return true;
  },
};
