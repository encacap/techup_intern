const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createTodo = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        isCompleted: Joi.boolean().required(),
    }),
    params: Joi.object().keys({
        userId: Joi.custom(objectId).required(),
        listId: Joi.custom(objectId).required(),
    }),
};

const getTodos = {
    params: Joi.object().keys({
        userId: Joi.custom(objectId).required(),
        listId: Joi.custom(objectId).required(),
    }),
    query: Joi.object().keys({
        status: Joi.string().valid("all", "completed", "incomplete").default("all"),
    }),
};

const updateTodo = {
    body: Joi.object().keys({
        name: Joi.string(),
        isCompleted: Joi.boolean(),
    }),
    params: Joi.object().keys({
        userId: Joi.custom(objectId).required(),
        listId: Joi.custom(objectId).required(),
        todoId: Joi.custom(objectId).required(),
    }),
};

const deleteTodo = {
    params: Joi.object().keys({
        userId: Joi.custom(objectId).required(),
        listId: Joi.custom(objectId).required(),
        todoId: Joi.custom(objectId).required(),
    }),
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
};
