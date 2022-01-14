const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getLists = {
    params: Joi.object().keys({
        userId: Joi.custom(objectId).required(),
    }),
};

const createList = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
    params: Joi.object().keys({
        userId: Joi.custom(objectId).required(),
    }),
};

const updateList = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    }),
    params: Joi.object().keys({
        userId: Joi.custom(objectId).required(),
        listId: Joi.custom(objectId).required(),
    }),
};

module.exports = {
    getLists,
    createList,
    updateList,
};
