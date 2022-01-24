import { FilterQuery } from "mongoose";
import Confession, { ConfessionDocument } from "../models/confession.model";

export type ConfessionBody = {
    content: string;
    isApproved?: boolean;
    title: string;
};

type CreateConfession = (confessionBody: ConfessionBody) => Promise<ConfessionDocument>;

/**
 * Create a new confession
 * @param {ConfessionDocument} confessionBody
 * @returns {Promise<ConfessionDocument>}
 */
const createConfession: CreateConfession = async (confessionBody): Promise<ConfessionDocument> => {
    const newConfession = await Confession.create(confessionBody);
    return newConfession;
};

/**
 * Query for confession
 * @param {FilterQuery<object>} filters - MongoDB query filters
 * @returns {Promise<ConfessionDocument[]>}
 */
const queryConfessions = async (filters: FilterQuery<object>): Promise<ConfessionDocument[]> => {
    const confessions = (await Confession.find(filters)) as unknown as ConfessionDocument[];
    return confessions;
};

const getConfessionById = async (confessionId: string, isThrowError = true): Promise<ConfessionDocument> => {
    const confession = (await Confession.findById(confessionId)) as ConfessionDocument;
    if (!confession && isThrowError) {
        throw new Error("Confession not found");
    }
    return confession;
};

const approveConfession = async (confessionId: string): Promise<ConfessionDocument> => {
    const confession = await getConfessionById(confessionId);
    confession.isApproved = true;
    return confession.save();
};

export default {
    createConfession,
    queryConfessions,
    approveConfession,
};
