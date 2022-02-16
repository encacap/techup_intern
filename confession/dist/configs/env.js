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
};
//# sourceMappingURL=env.js.map