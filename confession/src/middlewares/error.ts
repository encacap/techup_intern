import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { Error as MongooseError } from "mongoose";

import configs from "../configs/general";
import logger from "../configs/logger";
import ApiError, { IApiError } from "../utils/apiError";

const errorConverter = (err: IApiError, req: Request, res: Response, next: NextFunction) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof MongooseError
                ? httpStatus.BAD_REQUEST
                : httpStatus.INTERNAL_SERVER_ERROR;
        const message: string = error.message || (httpStatus[statusCode] as string);
        error = new ApiError(statusCode, message, false, err.stack);
    }

    next(error);
};

const errorHandler = (
    err: IApiError,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    let { statusCode } = err;
    let { message } = err;

    if (configs.env === "production" && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR] as string;
    }

    res.locals.errorMessage = message;

    const response = {
        code: statusCode,
        message,
        ...(configs.env === "development" && { stack: err.stack }),
    };

    if (configs.env === "development") {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
