import Joi from "joi";
import Validation from "./Validation";

const register: Validation = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
};

const login: Validation = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
};

export default { register, login };
