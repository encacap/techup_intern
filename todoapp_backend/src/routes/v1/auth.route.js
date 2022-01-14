const express = require("express");
const validate = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const authValidation = require("../../validations/auth.validation");
const authController = require("../../controllers/auth.controller");

const router = express.Router();

router.post("/register", validate(authValidation.register), authController.register);
router.post("/login", validate(authValidation.login), authController.login);
router.post("/logout", validate(authValidation.logout), authController.logout);
router.post("/refresh-tokens", validate(authValidation.refreshTokens), authController.refreshTokens);
router.post(
    "/send-verification-email",
    auth(),
    validate(authValidation.sendVerificationEmail),
    authController.sendVerificationEmail
);
router.post("/verify-email", validate(authValidation.verifyEmail), authController.verifyEmail);
router.post("/forgot-password", validate(authValidation.forgotPassword), authController.forgotPassword);
router.post("/reset-password", validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router;
