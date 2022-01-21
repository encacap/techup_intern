import { RequestHandler, Request, Response, NextFunction } from "express";

type CatchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => RequestHandler;

const catchAsync: CatchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
};

export default catchAsync;
