const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const casual = require("casual");
const { User } = require("../../src/models");

const password = "password121!";
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
    _id: mongoose.Types.ObjectId(),
    name: casual.name,
    email: casual.email.toLowerCase(),
    password,
    role: "user",
    isEmailVerified: false,
};

const userTwo = {
    _id: mongoose.Types.ObjectId(),
    name: casual.name,
    email: casual.email.toLowerCase(),
    password,
    role: "user",
    isEmailVerified: false,
};

const insertUsers = async (users) => {
    await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
    userOne,
    userTwo,
    insertUsers,
};
