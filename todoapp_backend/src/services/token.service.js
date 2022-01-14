const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const config = require("../config/config");
const { Token } = require("../models");
const { tokenTypes } = require("../config/tokens");

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: dayjs().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    });
    return tokenDoc;
};

const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await Token.findOne({
        token,
        type,
        user: payload.sub,
        blacklisted: false,
    });
    if (!tokenDoc) {
        throw new Error("Token not found");
    }
    return tokenDoc;
};

const generateAuthTokens = async (user) => {
    const accessTokenExpires = dayjs().add(config.jwt.accessExpirationMinutes, "minutes");
    const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = dayjs().add(config.jwt.refreshExpirationDays, "days");
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
    await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};

const generateVerifyEmailToken = async (user) => {
    const verifyEmailTokenExpires = dayjs().add(config.jwt.verifyEmailExpirationMinutes, "minutes");
    const verifyEmailToken = generateToken(user.id, verifyEmailTokenExpires, tokenTypes.VERIFY_EMAIL);
    await saveToken(verifyEmailToken, user.id, verifyEmailTokenExpires, tokenTypes.VERIFY_EMAIL);
    return verifyEmailToken;
};

module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    generateVerifyEmailToken,
};
