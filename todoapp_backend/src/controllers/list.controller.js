const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { listService } = require("../services");

const createList = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const list = await listService.createList(userId, req.body);
    res.status(httpStatus.CREATED).json(list);
});

const getLists = catchAsync(async (req, res) => {
    const lists = await listService.getListsByUserId(req.params.userId);
    res.json(lists);
});

const updateList = catchAsync(async (req, res) => {
    const { listId } = req.params;
    const list = await listService.updateListById(listId, req.body);
    res.json(list);
});

const deleteList = catchAsync(async (req, res) => {
    const { listId } = req.params;
    await listService.deleteListById(listId);
    res.status(httpStatus.NO_CONTENT).end();
});

module.exports = {
    createList,
    getLists,
    updateList,
    deleteList,
};
