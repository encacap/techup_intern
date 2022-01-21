"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const general_1 = __importDefault(require("./configs/general"));
const logger_1 = __importDefault(require("./configs/logger"));
let server;
mongoose_1.default
    .connect(general_1.default.mongoose.url, general_1.default.mongoose.options)
    .then(() => {
    logger_1.default.info("Connected to MongoDB");
    server = app_1.default.listen(general_1.default.port, () => {
        logger_1.default.info("Listening on port %d", general_1.default.port);
    });
})
    .catch((error) => {
    logger_1.default.error("Error connecting to MongoDB: %s", error.message);
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger_1.default.info("Server closed successfully");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    logger_1.default.error(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    logger_1.default.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
//# sourceMappingURL=index.js.map