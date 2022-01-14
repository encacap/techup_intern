const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { todoService } = require("../services");

const createList = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const list = await todoService.createList(userId, req.body);
    res.status(httpStatus.CREATED).json(list);
});

const getLists = catchAsync(async (req, res) => {
    const lists = await todoService.getListsByUserId(req.params.userId);
    res.json(lists);
});

const updateList = catchAsync(async (req, res) => {
    const { listId } = req.params;
    const list = await todoService.updateListById(listId, req.body);
    res.json(list);
});

const deleteList = catchAsync(async (req, res) => {
    const { listId } = req.params;
    await todoService.deleteListById(listId);
    res.status(httpStatus.NO_CONTENT).end();
});

module.exports = {
    createList,
    getLists,
    updateList,
    deleteList,
};
