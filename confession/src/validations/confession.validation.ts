import Joi from "joi";
import Validation from "./Validation";

const createConfession: Validation = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        content: Joi.string().required(),
    }),
};

export default { createConfession };
