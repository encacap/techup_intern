const mongoose = require("mongoose");
const casual = require("casual");
const { List } = require("../../src/models");
const { userOne } = require("./user.fixture");

const listOne = {
    _id: mongoose.Types.ObjectId(),
    name: casual.name,
    user: userOne._id,
};

const insertLists = async (lists) => {
    await List.insertMany(lists);
};

module.exports = {
    listOne,
    insertLists,
};
