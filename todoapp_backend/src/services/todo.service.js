const httpStatus = require("http-status");
const { listService } = require(".");
const { Todo } = require("../models");
const ApiError = require("../utils/ApiError");

const createTodo = async (userId, listId, todoBody) => {
    const list = await listService.getListById(listId);
    const newTodo = new Todo({
        ...todoBody,
        user: userId,
        list: list.id,
    });
    return newTodo.save();
};

const getTodos = async (filters) => {
    const { list: listId } = filters;
    const list = filters.list && (await listService.getListById(listId));
    if (list) {
        // eslint-disable-next-line no-param-reassign
        filters.list = list.id;
    } else {
        // eslint-disable-next-line no-param-reassign
        delete filters.list;
    }
    const todos = await Todo.find(filters);
    return {
        results: todos,
        totalResults: todos.length,
    };
};

const getTodoById = async (todoId, throwError = true) => {
    const todo = await Todo.findById(todoId);
    if (!todo && throwError) {
        throw new ApiError(httpStatus.NOT_FOUND, "Todo not found");
    }
    return todo;
};

const updateTodoById = async (todoId, todoBody) => {
    const todo = await getTodoById(todoId);
    Object.assign(todo, todoBody);
    return todo.save();
};

const deleteTodoById = async (todoId) => {
    const todo = await getTodoById(todoId);
    return todo.remove();
};

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodoById,
    deleteTodoById,
};
