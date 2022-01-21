"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const paginate_plugin_1 = __importDefault(require("./plugins/paginate.plugin"));
const confessionSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    number: {
        type: Number,
        default: Date.now(),
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
});
confessionSchema.plugin(paginate_plugin_1.default);
/**
 * @typedef Confession
 */
const Confession = mongoose_1.default.model("Confession", confessionSchema);
exports.default = Confession;
//# sourceMappingURL=confession.model.js.map