"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.errorConverter = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const general_1 = __importDefault(require("../configs/general"));
const logger_1 = __importDefault(require("../configs/logger"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof apiError_1.default)) {
        const statusCode = error.statusCode || error instanceof mongoose_1.Error
            ? http_status_1.default.BAD_REQUEST
            : http_status_1.default.INTERNAL_SERVER_ERROR;
        const message = error.message || http_status_1.default[statusCode];
        error = new apiError_1.default(statusCode, message, false, err.stack);
    }
    next(error);
};
exports.errorConverter = errorConverter;
const errorHandler = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    let { statusCode } = err;
    let { message } = err;
    if (general_1.default.env === "production" && !err.isOperational) {
        statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
        message = http_status_1.default[http_status_1.default.INTERNAL_SERVER_ERROR];
    }
    res.locals.errorMessage = message;
    const response = Object.assign({ code: statusCode, message }, (general_1.default.env === "development" && { stack: err.stack }));
    if (general_1.default.env === "development") {
        logger_1.default.error(err);
    }
    res.status(statusCode).send(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map