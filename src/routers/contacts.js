import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  updateContactController,
} from '../controllers/contacts.js';

import { authenticate } from '../middlewares/authenticate.js';

import {validateBody} from '../middlewares/validateBody.js';
import {isValidId} from '../middlewares/isValidId.js';
import {contactSchema, updateContactSchema} from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';


const router = Router();

router.use(authenticate);
router.get('/',ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('/',validateBody(contactSchema), ctrlWrapper(createContactController));
router.delete('/:contactId', isValidId,
 ctrlWrapper(deleteContactController));
router.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContactController));

export default router;
