const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
    }),
};

const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const sendVerificationEmail = {
    body: Joi.object().keys({
        callback: Joi.string().required(),
    }),
};

const verifyEmail = {
    body: Joi.object().keys({
        token: Joi.string().required(),
    }),
};

const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        callback: Joi.string().required(),
    }),
};

const resetPassword = {
    body: Joi.object().keys({
        token: Joi.string().required(),
        password: Joi.string().required().custom(password),
        confirmPassword: Joi.string().required().custom(password),
    }),
};

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    sendVerificationEmail,
    verifyEmail,
    forgotPassword,
    resetPassword,
};
