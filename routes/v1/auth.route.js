const express = require("express");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");
const authController = require("../../controllers/auth.controller");

const router = express.Router();

const validateRegisterRequest = validate(authValidation.register);
const validateLoginRequest = validate(authValidation.login);

router.post("/register", validateRegisterRequest, authController.register);
router.post("/login", validateLoginRequest, authController.login);

module.exports = router;
