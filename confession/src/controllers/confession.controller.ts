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

const updateConfession = catchAsync(async (req: Request, res: Response) => {
    const { confessionId } = req.params;
    const confession = await confessionService.approveConfession(confessionId);
    res.send(confession);
});

export default {
    createConfession,
    getConfessions,
    updateConfession,
};
