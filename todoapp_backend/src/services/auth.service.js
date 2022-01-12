const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Token } = require("../models");
const { tokenTypes } = require("../config/tokens");
const userService = require("./user.service");
const tokenService = require("./token.service");

const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Incorrect email or password"
        );
    }
    return user;
};

const logout = async (refreshToken) => {
    const refreshTokenDoc = await Token.findOne({
        token: refreshToken,
        type: tokenTypes.REFRESH,
        blacklisted: false,
    });

    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, "Refresh Token is invalid");
    }

    await refreshTokenDoc.remove();
};

const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(
            refreshToken,
            tokenTypes.REFRESH
        );
        const user = await userService.getUserById(refreshTokenDoc.user);
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "User not found");
        }
        await refreshTokenDoc.remove();
        const tokens = await tokenService.generateAuthTokens(user);
        return tokens;
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
    }
};

const verifyEmail = async (verifyEmailToken) => {
    try {
        const verifyEmailTokenDoc = await tokenService.verifyToken(
            verifyEmailToken,
            tokenTypes.VERIFY_EMAIL
        );
        const user = await userService.getUserById(verifyEmailTokenDoc.user);

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "User not found");
        }

        const { id: userId } = user;

        await Token.deleteMany({
            user: userId,
            type: tokenTypes.VERIFY_EMAIL,
        });
        await userService.updateUserById(userId, {
            isEmailVerified: true,
        });
    } catch (error) {
        throw new ApiError(
            httpStatus.UNAUTHORIZED,
            "Email verification failed"
        );
    }
};

module.exports = {
    loginUserWithEmailAndPassword,
    logout,
    refreshAuth,
    verifyEmail,
};
