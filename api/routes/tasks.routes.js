/* IMPORTING MODULES */
const express = require("express");

// importing required middlewares
const authenticateRequest = require(`../middlewares/checkAuth`);

const TaskController = require("../controllers/tasks.controllers");

/* Validations */
const { validateInput } = require("../middlewares/validateInput");

const TaskValidator = require("../validators/tasks.validators");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
//create new task
router.post(
  "/",
  authenticateRequest,
  validateInput(TaskValidator.create, "BODY"),
  TaskController.create
);

//get task by id
router.get(
  "/",
  authenticateRequest,
  validateInput(TaskValidator.get, "QUERY"),
  TaskController.get
);

router.patch(
  "/",
  authenticateRequest,
  validateInput(TaskValidator.update, "BODY"),
  TaskController.update
);

router.delete(
  "/",
  authenticateRequest,
  validateInput(TaskValidator.deleteById, "QUERY"),
  TaskController.deleteById
);

router.get(
  "/list",
  authenticateRequest,
  validateInput(TaskValidator.list, "QUERY"),
  TaskController.list
);

module.exports = router;
