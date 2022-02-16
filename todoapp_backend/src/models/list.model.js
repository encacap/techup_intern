const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const listSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

listSchema.plugin(toJSON);
listSchema.plugin(paginate);

const List = mongoose.model("List", listSchema);

module.exports = List;
