/* IMPORTING MODULES */
const express = require("express");

// importing required middlewares
const authenticateRequest = require(`../middlewares/checkAuth`);

const UserController = require("../controllers/users.controllers");
/* Validations */
const { validateInput } = require("../middlewares/validateInput");

const UserValidator = require("../validators/users.validators");

/* CREATING A ROUTING FUNCTION */
const router = express.Router();

/* ROUTES */
router.post(
  "/login",
  validateInput(UserValidator.userLoginOrSignup, "BODY"),
  UserController.login
);

router.get("/logout", authenticateRequest, UserController.logout);

router.post(
  "/signup",
  validateInput(UserValidator.userLoginOrSignup, "BODY"),
  UserController.signUp
);

module.exports = router;
