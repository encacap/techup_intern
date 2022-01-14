const catchAsync = require("../utils/catchAsync");
const { todoService } = require("../services");

const createList = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const list = await todoService.createList(userId, req.body);
    res.status(201).json(list);
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

module.exports = {
    createList,
    getLists,
    updateList,
};
