const { objectIdValidation } = require(`../helpers/joi.helpers`);
const Joi = require("joi");
const create = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  status: Joi.string().required(),
});

const get = Joi.object({
  taskId: Joi.custom(objectIdValidation, "Task ID Validation").required(),
});

const list = Joi.object({
  page: Joi.number().required(),
  recordsPerPage: Joi.number().required(),
});

const update = Joi.object({
  taskId: Joi.custom(objectIdValidation, "Task ID Validation").required(),
  description: Joi.string(),
  dueDate: Joi.date(),
  title: Joi.string(),
  status: Joi.string(),
});

const deleteById = Joi.object({
  taskId: Joi.custom(objectIdValidation, "Task ID Validation").required(),
});

module.exports = {
  deleteById,
  create,
  get,
  list,
  update,
};
