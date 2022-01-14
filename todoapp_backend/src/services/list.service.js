const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { List } = require("../models");

const createList = async (userId, listBody) => {
    const { name } = listBody;
    const list = new List({
        name,
        user: userId,
    });
    return list.save();
};

const getListsByUserId = async (userId) => {
    const lists = await List.find({ user: userId });
    return {
        results: lists,
        totalResults: lists.length,
    };
};

const getListById = async (listId, throwError = true) => {
    const list = await List.findById(listId);
    if (!list && throwError) {
        throw new ApiError(httpStatus.NOT_FOUND, "List not found");
    }
    return list;
};

const updateListById = async (listId, listBody) => {
    const list = await getListById(listId);
    Object.assign(list, listBody);
    return list.save();
};

const deleteListById = async (listId) => {
    const list = await getListById(listId);
    return list.remove();
};

module.exports = {
    createList,
    getListsByUserId,
    updateListById,
    deleteListById,
};
