import mongoose from "mongoose";
import paginate from "./plugins/paginate.plugin";

export interface ConfessionDocument extends mongoose.Document {
    content: string;
    isApproved: boolean;
    number: number;
    title: string;
}

const confessionSchema = new mongoose.Schema<ConfessionDocument>({
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

confessionSchema.plugin(paginate);

/**
 * @typedef Confession
 */
const Confession = mongoose.model("Confession", confessionSchema);

export default Confession;
