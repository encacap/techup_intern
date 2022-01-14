const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const todoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        list: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "List",
        },
    },
    {
        timestamps: true,
    }
);

todoSchema.plugin(toJSON);
todoSchema.plugin(paginate);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
