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



