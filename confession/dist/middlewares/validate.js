"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = __importDefault(require("joi"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const pick_1 = __importDefault(require("../utils/pick"));
const validate = (schema) => (req, res, next) => {
    const validSchema = (0, pick_1.default)(schema, ["params", "query", "body"]);
    const object = (0, pick_1.default)(req, Object.keys(validSchema));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({
        errors: { label: "key" },
        abortEarly: false,
    })
        .validate(object);
    if (error) {
        const errorMessage = error.details.map((item) => item.message).join(", ");
        return next(new apiError_1.default(http_status_1.default.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.default = validate;
//# sourceMappingURL=validate.js.map