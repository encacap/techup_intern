import express from "express";
import morgan from "morgan";

import configs from "./general";
import logger from "./logger";

interface ServerResponse extends express.Response {
    locals: {
        errorMessage: string;
    };
}

morgan.token("message", (req, res: ServerResponse): string => {
    if ("locals" in res) {
        return res.locals.errorMessage;
    }
    return "";
});

const getIpFormat = (): string => (configs.env === "production" ? ":remote-addr" : "");
const successResponseFormat = `${getIpFormat()}:method :url :status :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: {
        write: (message) => logger.info(message.trim()),
    },
});

const errorHandler = morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: {
        write: (message) => logger.error(message.trim()),
    },
});

export default {
    successHandler,
    errorHandler,
};
