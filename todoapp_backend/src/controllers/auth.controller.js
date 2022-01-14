const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService, userService, tokenService, emailService } = require("../services");

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.sendStatus(httpStatus.NO_CONTENT);
});

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
    await emailService.sendVerificationEmail(req.user, verifyEmailToken, req.body.callback);
    res.sendStatus(httpStatus.NO_CONTENT);
});

const verifyEmail = catchAsync(async (req, res) => {
    await authService.verifyEmail(req.body.token);
    res.sendStatus(httpStatus.NO_CONTENT);
});

module.exports = {
    register,
    login,
    logout,
    refreshTokens,
    sendVerificationEmail,
    verifyEmail,
};
