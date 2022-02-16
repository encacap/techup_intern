import { Server } from "http";
import mongoose from "mongoose";

import app from "./app";
import configs from "./configs/general";
import logger from "./configs/logger";

let server: Server;

mongoose
    .connect(configs.mongoose.url, configs.mongoose.options)
    .then(() => {
        logger.info("Connected to MongoDB");
        server = app.listen(configs.port, () => {
            logger.info("Listening on port %d", configs.port);
        });
    })
    .catch((error: Error) => {
        logger.error("Error connecting to MongoDB: %s", error.message);
    });

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info("Server closed successfully");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error: Error) => {
    logger.error(error);
    exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
