const mongoose = require("mongoose");
const casual = require("casual");

const { listOne } = require("./list.fixture");
const { userOne } = require("./user.fixture");
const { Todo } = require("../../src/models");

const todoOne = {
    _id: mongoose.Types.ObjectId(),
    name: casual.name,
    isCompleted: false,
    user: userOne._id,
    list: listOne._id,
};

const todoTwo = {
    _id: mongoose.Types.ObjectId(),
    name: casual.name,
    isCompleted: true,
    user: userOne._id,
    list: listOne._id,
};

const insertTodos = async (todos) => {
    await Todo.insertMany(todos);
};

module.exports = {
    todoOne,
    todoTwo,
    insertTodos,
};
