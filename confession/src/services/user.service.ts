import httpStatus from "http-status";
import User, { UserDocument } from "../models/user.model";
import ApiError from "../utils/apiError";

type UserBody = {
    email: string;
    name: string;
    password: string;
};

/**
 * Create a new user
 * @param {UserBody} userBody - The user's data
 * @returns {Promise<UserDocument>}
 */
const createUser = async (userBody: UserBody): Promise<UserDocument> => {
    const isEmailTaken = await User.isEmailTaken(userBody.email);
    if (isEmailTaken) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
    }
    return User.create(userBody);
};

const loginWithEmailAndPassword = async (email: string, password: string): Promise<UserDocument> => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Email or password is incorrect");
        }
        const isPasswordValid = await user.isPasswordMatch(password);
        if (!isPasswordValid) {
            throw new Error("Email or password is incorrect");
        }
        return user;
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Email or password is incorrect");
    }
};

export { UserBody, createUser, loginWithEmailAndPassword };
