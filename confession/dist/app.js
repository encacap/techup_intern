"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const http_status_1 = __importDefault(require("http-status"));
const general_1 = __importDefault(require("./configs/general"));
const morgan_1 = __importDefault(require("./configs/morgan"));
const error_1 = require("./middlewares/error");
const routes_1 = __importDefault(require("./routes"));
const apiError_1 = __importDefault(require("./utils/apiError"));
const app = (0, express_1.default)();
if (general_1.default.env !== "test") {
    app.use(morgan_1.default.successHandler);
    app.use(morgan_1.default.errorHandler);
}
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
// Routes
app.use("/", routes_1.default);
// 404
app.use((req, res, next) => {
    next(new apiError_1.default(http_status_1.default.NOT_FOUND, "Not found"));
});
// Convert error to ApiError, if needed
app.use(error_1.errorConverter);
// Handle error
app.use(error_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map