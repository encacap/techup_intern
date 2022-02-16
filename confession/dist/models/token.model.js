"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const token_1 = __importDefault(require("../configs/token"));
const tokenSchema = new mongoose_1.default.Schema({
    expires: {
        type: Date,
        required: true,
    },
    token: {
        type: String,
        index: true,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: [token_1.default.ACCESS, token_1.default.REFRESH],
    },
    user: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
/**
 * @typedef {TokenDocument} Token
 */
const Token = mongoose_1.default.model("Token", tokenSchema);
exports.default = Token;
//# sourceMappingURL=token.model.js.map