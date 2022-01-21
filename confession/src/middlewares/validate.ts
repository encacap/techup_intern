import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Joi from "joi";
import ApiError from "../utils/apiError";
import pick from "../utils/pick";
import Validation from "../validations/Validation";

type Validate = (schema: Validation) => (req: Request, res: Response, next: NextFunction) => void;

const validate: Validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ["params", "query", "body"]);
    const object = pick(req, Object.keys(validSchema));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { value, error } = Joi.compile(validSchema)
        .prefs({
            errors: { label: "key" },
            abortEarly: false,
        })
        .validate(object);

    if (error) {
        const errorMessage = error.details.map((item) => item.message).join(", ");
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }

    Object.assign(req, value);
    return next();
};

export default validate;
