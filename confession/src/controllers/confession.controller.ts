import { Request, Response } from "express";
import { ConfessionDocument } from "../models/confession.model";
import confessionService, { ConfessionBody } from "../services/confession.service";
import catchAsync from "../utils/catchAsync";

const createConfession = catchAsync(async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { body: confessionBody }: { body: ConfessionBody } = req;
    const confession: ConfessionDocument = await confessionService.createConfession(confessionBody);
    res.send(confession);
});

const getConfessions = catchAsync(async (req: Request, res: Response) => {
    const confessions = await confessionService.queryConfessions({});
    res.send(confessions);
});

export default {
    createConfession,
    getConfessions,
};
