const informationPath = require("./information");
const listsPath = require("./lists");
const listPath = require("./list");
const todosPath = require("./todos");
const todoPath = require("./todo");

const users = (userId) => `/users${userId ? "/:userId" : ""}`;
const lists = (listId) => `${users(true)}/lists${listId ? "/:listId" : ""}`;
const todos = (todoID) => `${lists(true)}/todos${todoID ? "/:todoID" : ""}`;
const shorterTodo = (todoID) => `${users(true)}/todos${todoID ? "/:todoId" : ""}`;

module.exports = {
    paths: {
        [users(true)]: informationPath,
        [lists()]: listsPath,
        [lists(true)]: listPath,
        [todos()]: todosPath,
        [todos(true)]: todoPath,
        [shorterTodo()]: { get: todosPath.get },
        [shorterTodo(true)]: todoPath,
    },
};
