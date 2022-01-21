import dotenv from "dotenv";
import Joi, { ValidationResult } from "joi";
import { ConnectOptions } from "mongoose";
import path from "path";

interface EnvConfig {
    [key: string]: string | undefined;
}

dotenv.config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV || "development"}`) });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid("production", "development", "test"),
        PORT: Joi.number().default(3000),
        MONGODB_URI: Joi.string().description("MongoDB connection URL"),
        JWT_SECRET: Joi.string().required().description("JWT secret key"),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description("Minutes after which access tokens expire"),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description("Days after which refresh tokens expire"),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description("Minutes after which reset password token expires"),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description("Minutes after which verify email token expires"),
    })
    .unknown();

const validationResult: ValidationResult<object> = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

const validationValues: EnvConfig = validationResult.value as EnvConfig;
const { error } = validationResult;

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

interface EnvConfigs {
    env: string;
    jwt: {
        accessExpirationMinutes: number;
        refreshExpirationDays: number;
        resetPasswordExpirationMinutes: number;
        secret: string;
        verifyEmailExpirationMinutes: number;
    };
    mongoose: {
        options: ConnectOptions;
        url: string;
    };
    port: number;
}

export default {
    env: validationValues?.NODE_ENV,
    port: Number(validationValues?.PORT),
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
} as EnvConfigs;
