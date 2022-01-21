"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, `../../.env.${process.env.NODE_ENV || "development"}`) });
const envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().valid("production", "development", "test"),
    PORT: joi_1.default.number().default(3000),
    MONGODB_URI: joi_1.default.string().description("MongoDB connection URL"),
    JWT_SECRET: joi_1.default.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: joi_1.default.number().default(30).description("Minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: joi_1.default.number().default(30).description("Days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: joi_1.default.number()
        .default(10)
        .description("Minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: joi_1.default.number()
        .default(10)
        .description("Minutes after which verify email token expires"),
})
    .unknown();
const validationResult = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);
const validationValues = validationResult.value;
const { error } = validationResult;
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.default = {
    env: validationValues === null || validationValues === void 0 ? void 0 : validationValues.NODE_ENV,
    port: Number(validationValues === null || validationValues === void 0 ? void 0 : validationValues.PORT),
    mongoose: {
        url: validationValues.MONGODB_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: validationValues.JWT_SECRET,
        accessExpirationMinutes: Number(validationValues.JWT_ACCESS_EXPIRATION_MINUTES),
        refreshExpirationDays: Number(validationValues.JWT_REFRESH_EXPIRATION_DAYS),
        resetPasswordExpirationMinutes: Number(validationValues.JWT_RESET_PASSWORD_EXPIRATION_MINUTES),
        verifyEmailExpirationMinutes: Number(validationValues.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES),
    },
};
//# sourceMappingURL=general.js.map