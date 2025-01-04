import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email(),
    phoneNumber: Joi.string().min(3).max(20).required(),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),

});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    phoneNumber: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid('work', 'home', 'personal'),
}).or('name', 'email', 'phoneNumber', 'isFavourite', 'contactType');
