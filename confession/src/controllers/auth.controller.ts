import { Request, Response } from "express";
import httpStatus from "http-status";
import { userService, tokenService } from "../services";
import catchAsync from "../utils/catchAsync";

const register = catchAsync(async (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { body }: { body: userService.UserBody } = req;
    const user = await userService.createUser(body);
    const tokens = await tokenService.generateAuthToken(user);
    res.status(httpStatus.CREATED).send({
        user,
        tokens,
    });
});

const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body as {
        email: string;
        password: string;
    };
    const user = await userService.loginWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthToken(user);
    res.status(httpStatus.OK).send({
        user,
        tokens,
    });
});

export default {
    register,
    login,
};
