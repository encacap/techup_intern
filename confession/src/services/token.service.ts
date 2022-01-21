import dayjs, { Dayjs } from "dayjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

import configs from "../configs/general";
import Token, { TokenDocument } from "../models/token.model";
import { UserDocument } from "../models/user.model";

interface TokenPayload extends JwtPayload {
    type: string;
    user: ObjectId;
}

/**
 *
 * @param {ObjectId} userId - The user's id
 * @param {Dayjs} expires - The token's expiration date
 * @param {string} type - The token's type
 * @param {string} secret - The secret used to sign the token
 * @returns {string} - The token
 */
const generateToken = (userId: ObjectId, expires: Dayjs, type: string, secret: string = configs.jwt.secret): string => {
    const payload: TokenPayload = {
        user: userId,
        iat: dayjs().unix(),
        exp: expires.unix(),
        type,
    };
    const token = jwt.sign(payload, secret);
    return token;
};

/**
 * Save a user's token to database
 * @param token - The token to save
 * @param userId - The user's id
 * @param expires - The token's expiration date
 * @param type - The token's type
 * @returns {Promise<TokenDocument>} - The token's document
 */
const saveToken = async (token: string, userId: ObjectId, expires: Dayjs, type: string): Promise<TokenDocument> => {
    const savedToken = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
    });
    return savedToken;
};

/**
 * Verify a token and return the token saved in the database if it's valid, otherwise throw an error
 * @param {string} token - The token to verify
 * @param {string} type - The token's type
 * @returns {Promise<TokenDocument>} - The token's document
 */
const verifyToken = async (token: string, type: string) => {
    const payload = jwt.verify(token, configs.jwt.secret) as TokenPayload;
    const savedToken = await Token.findOne({
        token,
        type,
        user: payload.user,
    });
    if (!savedToken) {
        throw new Error("Token is invalid");
    }
    return savedToken;
};

type AuthToken = {
    access: {
        expires: Date;
        token: string;
    };
    refresh: {
        expires: Date;
        token: string;
    };
};

/**
 * Generate an access token and a refresh token
 * @param {UserDocument} user - The user's document
 * @returns {Promise<AuthToken>} - The generated tokens
 */
const generateAuthToken = async (user: UserDocument): Promise<AuthToken> => {
    const accessTokenExpires: Dayjs = dayjs().add(configs.jwt.accessExpirationMinutes, "minutes");
    const accessToken: string = generateToken(user._id, accessTokenExpires, "access");

    const refreshTokenExpires: Dayjs = dayjs().add(configs.jwt.refreshExpirationDays, "days");
    const refreshToken: string = generateToken(user._id, refreshTokenExpires, "refresh");

    await saveToken(refreshToken, user._id, refreshTokenExpires, "refresh");

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

export { verifyToken, generateAuthToken };
