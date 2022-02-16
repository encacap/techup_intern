const httpStatus = require("http-status");
const { todoService } = require("../services");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");

const createTodo = catchAsync(async (req, res) => {
    const { listId } = req.params;
    const { user } = req;
    const todo = await todoService.createTodo(user.id, listId, req.body);
    res.status(httpStatus.CREATED).json(todo);
});

const getTodos = catchAsync(async (req, res) => {
    const { listId } = req.params;
    const { user } = req;
    const { status } = req.query;
    const filters = {};

    if (status) {
        switch (status) {
            case "all":
                break;
            case "completed":
                filters.isCompleted = true;
                break;
            case "incomplete":
                filters.isCompleted = false;
                break;
            default:
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid status");
        }
    }

    const todos = await todoService.getTodos({ user: user.id, list: listId, ...filters });
    res.status(httpStatus.OK).json(todos);
});

const updateTodo = catchAsync(async (req, res) => {
    const { todoId } = req.params;
    const todo = await todoService.updateTodoById(todoId, req.body);
    res.status(httpStatus.OK).json(todo);
});

const deleteTodo = catchAsync(async (req, res) => {
    const { todoId } = req.params;
    await todoService.deleteTodoById(todoId);
    res.status(httpStatus.NO_CONTENT).end();
});

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
};
