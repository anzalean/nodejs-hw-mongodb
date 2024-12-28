import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts.js';

import {validateBody, isValidId} from '../middlewares/validation.js';
import {contactSchema, updateContactSchema} from '../schemas/schemas.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('/contacts',validateBody(contactSchema), ctrlWrapper(createContactController));
router.delete('/contacts/:contactId',isValidId,
 ctrlWrapper(deleteContactController));
router.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContactController));

export default router;
