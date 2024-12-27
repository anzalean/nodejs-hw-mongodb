import Joi from 'joi';
import mongoose from 'mongoose';

export const validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }
        next();
    };
};

export const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(contactId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    next();
};

export const contactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(20).required(),
    isFavourite: Joi.boolean().optional(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    email: Joi.string().email(),
    phone: Joi.string().min(3).max(20),
    isFavourite: Joi.boolean(),
}).or('name', 'email', 'phone', 'isFavourite');


