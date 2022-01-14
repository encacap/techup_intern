const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    return User.create(userBody);
};

const queryUsers = async (filter, options) => {
    const users = await User.paginate(filter, options);
    return users;
};

const getUserById = async (id, throwError = true) => {
    const user = await User.findById(id);
    if (!user && throwError) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
};

const getUserByEmail = async (email, throwError = true) => {
    const user = await User.findOne({ email });
    if (!user && throwError) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return user;
};

const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteUserById = async (userId) => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    await user.remove();
    return user;
};

module.exports = {
    createUser,
    queryUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
};
