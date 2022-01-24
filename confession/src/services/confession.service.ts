import { FilterQuery } from "mongoose";
import Confession, { ConfessionDocument } from "../models/confession.model";
import * as redisService from "./redis.service";

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
    await redisService.setConfession(newConfession);
    return newConfession;
};

interface QueryConfessionsResult {
    isCacheHit: boolean;
    results: ConfessionDocument[];
    totalResults: number;
}

/**
 * Query for confession
 * @param {FilterQuery<object>} filters - MongoDB query filters
 * @returns {Promise<ConfessionDocument[]>}
 */
const queryConfessions = async (filters: FilterQuery<object>): Promise<QueryConfessionsResult> => {
    let confessions: ConfessionDocument[];
    let isCacheHit = false;

    const cachedConfessions = await redisService.getConfessions();

    if (cachedConfessions) {
        confessions = JSON.parse(cachedConfessions) as ConfessionDocument[];
        isCacheHit = true;
    }

    confessions = (await Confession.find(filters)) as unknown as ConfessionDocument[];
    await redisService.setConfessions(confessions);

    return { results: confessions, totalResults: confessions.length, isCacheHit };
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
