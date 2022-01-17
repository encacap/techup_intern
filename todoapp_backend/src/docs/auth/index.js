const registerPath = require("./register");
const loginPath = require("./login");
const logoutPath = require("./logout");
const sendVerificationEmailPath = require("./sendVerificationEmail");
const verifyEmailPath = require("./verifyEmail");
const forgotPasswordPath = require("./forgotPassword");
const resetPasswordPath = require("./resetPassword");

const getPath = (name) => {
    return `/auth/${name}`;
};

module.exports = {
    paths: {
        [getPath("register")]: registerPath,
        [getPath("login")]: loginPath,
        [getPath("logout")]: logoutPath,
        [getPath("send-verification-email")]: sendVerificationEmailPath,
        [getPath("verify-email")]: verifyEmailPath,
        [getPath("forgot-password")]: forgotPasswordPath,
        [getPath("reset-password")]: resetPasswordPath,
    },
};
