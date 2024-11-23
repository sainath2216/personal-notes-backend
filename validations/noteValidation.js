const Joi = require('joi');

const noteCreateSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().valid('Work', 'Personal', 'Others').required(),
    completed: Joi.boolean().optional(),
});

const noteUpdateSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    category: Joi.string().valid('Work', 'Personal', 'Others').optional(),
    completed: Joi.boolean().optional(),
});

module.exports = {
    noteCreateSchema,
    noteUpdateSchema
}