export interface IApiError {
    isOperational?: boolean;
    message: string;
    stack?: string;
    statusCode: number;
}

class ApiError extends Error implements IApiError {
    isOperational: boolean;

    statusCode: number;

    constructor(statusCode: number, message: string, isOperational = true, stack?: string) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
