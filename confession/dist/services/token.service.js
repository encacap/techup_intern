"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = exports.verifyToken = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const general_1 = __importDefault(require("../configs/general"));
const token_model_1 = __importDefault(require("../models/token.model"));
/**
 *
 * @param {ObjectId} userId - The user's id
 * @param {Dayjs} expires - The token's expiration date
 * @param {string} type - The token's type
 * @param {string} secret - The secret used to sign the token
 * @returns {string} - The token
 */
const generateToken = (userId, expires, type, secret = general_1.default.jwt.secret) => {
    const payload = {
        user: userId,
        iat: (0, dayjs_1.default)().unix(),
        exp: expires.unix(),
        type,
    };
    const token = jsonwebtoken_1.default.sign(payload, secret);
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
const saveToken = (token, userId, expires, type) => __awaiter(void 0, void 0, void 0, function* () {
    const savedToken = yield token_model_1.default.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
    });
    return savedToken;
});
/**
 * Verify a token and return the token saved in the database if it's valid, otherwise throw an error
 * @param {string} token - The token to verify
 * @param {string} type - The token's type
 * @returns {Promise<TokenDocument>} - The token's document
 */
const verifyToken = (token, type) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = jsonwebtoken_1.default.verify(token, general_1.default.jwt.secret);
    const savedToken = yield token_model_1.default.findOne({
        token,
        type,
        user: payload.user,
    });
    if (!savedToken) {
        throw new Error("Token is invalid");
    }
    return savedToken;
});
exports.verifyToken = verifyToken;
/**
 * Generate an access token and a refresh token
 * @param {UserDocument} user - The user's document
 * @returns {Promise<AuthToken>} - The generated tokens
 */
const generateAuthToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokenExpires = (0, dayjs_1.default)().add(general_1.default.jwt.accessExpirationMinutes, "minutes");
    const accessToken = generateToken(user._id, accessTokenExpires, "access");
    const refreshTokenExpires = (0, dayjs_1.default)().add(general_1.default.jwt.refreshExpirationDays, "days");
    const refreshToken = generateToken(user._id, refreshTokenExpires, "refresh");
    yield saveToken(refreshToken, user._id, refreshTokenExpires, "refresh");
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
});
exports.generateAuthToken = generateAuthToken;
//# sourceMappingURL=token.service.js.map