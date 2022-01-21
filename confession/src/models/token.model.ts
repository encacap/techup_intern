import mongoose from "mongoose";
import tokenTypes from "../configs/token";

export interface TokenDocument extends mongoose.Document {
    expires: Date;
    token: string;
    type: string;
    user: mongoose.ObjectId;
}

const tokenSchema = new mongoose.Schema<TokenDocument>(
    {
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
            enum: [tokenTypes.ACCESS, tokenTypes.REFRESH],
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * @typedef {TokenDocument} Token
 */
const Token = mongoose.model<TokenDocument>("Token", tokenSchema);

export default Token;
