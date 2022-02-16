"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const role_1 = require("../configs/role");
const plugins_1 = require("./plugins");
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
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
        enum: role_1.roles,
    },
}, {
    timestamps: true,
});
userSchema.plugin(plugins_1.paginate);
userSchema.plugin(plugins_1.toJSON);
/**
 * Check if email is taken
 * @param email - The user's email to check
 * @param excludeId - The user's own id is excluded from the check
 * @returns {Promise<boolean>} - True if email is taken, false otherwise
 */
userSchema.statics.isEmailTaken = function (email, excludeId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = (yield this.findOne({ email, _id: { $ne: excludeId } }));
        return !!user;
    });
};
/**
 * Check if password is correct
 * @param {string} password - The user's password to check
 * @returns {Promise<boolean>} - True if password is matched, false otherwise
 */
userSchema.methods.isPasswordMatch = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        return bcryptjs_1.default.compare(password, user.password);
    });
};
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            user.password = yield bcryptjs_1.default.hash(user.password, 8);
        }
        next();
    });
});
/**
 * @typedef User
 */
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map