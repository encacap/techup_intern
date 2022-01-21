import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";
import { roles } from "../configs/role";
import { paginate, toJSON } from "./plugins";

export interface UserDocument extends mongoose.Document {
    _id: mongoose.ObjectId;
    email: string;
    isEmailVerified: boolean;
    isPasswordMatch: (password: string) => Promise<boolean>;
    name: string;
    password: string;
    role: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
    isEmailTaken: (email: string, excludeId?: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value: string) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
            },
        },
        isEmailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            private: true,
        },
        role: {
            type: String,
            required: true,
            default: "user",
            enum: roles,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.plugin(paginate);
userSchema.plugin(toJSON);

/**
 * Check if email is taken
 * @param email - The user's email to check
 * @param excludeId - The user's own id is excluded from the check
 * @returns {Promise<boolean>} - True if email is taken, false otherwise
 */
userSchema.statics.isEmailTaken = async function (email: string, excludeId?: string): Promise<boolean> {
    const user = (await this.findOne({ email, _id: { $ne: excludeId } })) as UserDocument;
    return !!user;
};

/**
 * Check if password is correct
 * @param {string} password - The user's password to check
 * @returns {Promise<boolean>} - True if password is matched, false otherwise
 */
userSchema.methods.isPasswordMatch = async function (password: string): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
    const user = this as UserDocument;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

/**
 * @typedef User
 */
const User = mongoose.model<UserDocument, UserModel>("User", userSchema);

export default User;
