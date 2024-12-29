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
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);
router.get('/contacts', checkRoles(ROLES.ADMIN), ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', checkRoles(ROLES.USER, ROLES.ADMIN), isValidId, ctrlWrapper(getContactByIdController));
router.post('/contacts', checkRoles(ROLES.ADMIN), validateBody(contactSchema), ctrlWrapper(createContactController));
router.delete('/contacts/:contactId', checkRoles(ROLES.ADMIN), isValidId,
 ctrlWrapper(deleteContactController));
router.patch('/contacts/:contactId', checkRoles(ROLES.ADMIN), isValidId, validateBody(updateContactSchema), ctrlWrapper(updateContactController));

export default router;
