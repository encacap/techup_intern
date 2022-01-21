import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import passport from "passport";
import { rolesRights } from "../configs/role";
import ApiError from "../utils/apiError";

interface User {
    id: string;
    role: string;
}

const verifyCallback =
    (req: Request, resolve: (value?: unknown) => void, reject: (error: Error) => void, requiredRights: string[]) =>
    async (error: Error, user: User, info: object) => {
        if (error || info || user) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized"));
        }

        req.user = user;

        // eslint-disable-next-line no-param-reassign
        user = req.user as User;

        if (requiredRights.length) {
            const userRights = rolesRights.get(user.role) as string[];
            const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
            if (!hasRequiredRights && req.params.userId !== user.id) {
                return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
            }
        }

        resolve();
    };

const auth =
    (...requiredRight: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        return new Promise((resolve, reject) => {
            passport
                .authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject, requiredRight))(
                    req,
                    res,
                    next
                )
                .then(() => next())
                .catch((error: Error) => next(error));
        });
    };

export default auth;
