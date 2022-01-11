const request = require("supertest");
const casual = require("casual");
const httpStatus = require("http-status");
const dayjs = require("dayjs");

const app = require("../../src/app");

const setupTestDB = require("../utils/setupTestDB");
const { User, Token } = require("../../src/models");
const { tokenService } = require("../../src/services");

const { userOne, insertUsers } = require("../fixtures/user.fixture");
const configs = require("../../src/config/config");
const { tokenTypes } = require("../../src/config/tokens");

setupTestDB();

describe("Auth", () => {
    const registerRoute = "/v1/auth/register";
    const loginRoute = "/v1/auth/login";
    const logoutRoute = "/v1/auth/logout";

    describe(`POST ${registerRoute}`, () => {
        let newUser = {};

        beforeEach(() => {
            newUser = {
                name: casual.name,
                email: casual.email.toLowerCase(),
                password: "encacap123",
            };
        });

        test("Should return 201 and new user if request is OK", async () => {
            const res = await request(app).post(registerRoute).send(newUser);

            expect(res.status).toBe(httpStatus.CREATED);
            expect(res.body.user).not.toHaveProperty("password");
            expect(res.body.user).toEqual({
                id: expect.anything(),
                name: newUser.name,
                email: newUser.email,
                role: "user",
                isEmailVerified: false,
            });

            expect(res.body.tokens).toEqual({
                access: {
                    token: expect.anything(),
                    expires: expect.anything(),
                },
                refresh: {
                    token: expect.anything(),
                    expires: expect.anything(),
                },
            });

            const savedUser = await User.findById(res.body.user.id);
            expect(savedUser).toBeDefined();
            expect(savedUser).toMatchObject({
                name: newUser.name,
                email: newUser.email,
                role: "user",
                isEmailVerified: false,
            });
        });

        test("Should return 400 if email is invalid", async () => {
            newUser.email = "invalid-email";
            await request(app)
                .post(registerRoute)
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST);
        });

        test("Should return 400 if email is already exists", async () => {
            await insertUsers([userOne]);
            newUser.email = userOne.email;
            await request(app)
                .post(registerRoute)
                .send(newUser)
                .expect(httpStatus.BAD_REQUEST);
        });
    });

    describe(`POST ${loginRoute}`, () => {
        test("Should return 200 and user data if request is OK", async () => {
            await insertUsers([userOne]);

            const loginCredentials = {
                email: userOne.email,
                password: userOne.password,
            };

            const res = await request(app)
                .post(loginRoute)
                .send(loginCredentials);

            expect(res.status).toBe(httpStatus.OK);
            expect(res.body.user).not.toHaveProperty("password");
            expect(res.body.user).toEqual({
                id: expect.anything(),
                name: userOne.name,
                email: userOne.email,
                role: "user",
                isEmailVerified: userOne.isEmailVerified,
            });

            expect(res.body.tokens).toEqual({
                access: {
                    token: expect.anything(),
                    expires: expect.anything(),
                },
                refresh: {
                    token: expect.anything(),
                    expires: expect.anything(),
                },
            });
        });

        test("Should return 401 if email is doesn't exists", async () => {
            const loginCredentials = {
                email: userOne.email,
                password: userOne.password,
            };

            const res = await request(app)
                .post(loginRoute)
                .send(loginCredentials)
                .expect(httpStatus.UNAUTHORIZED);

            expect(res.body).toEqual({
                code: httpStatus.UNAUTHORIZED,
                message: "Incorrect email or password",
            });
        });

        test("Should return 401 if password does not match", async () => {
            await insertUsers([userOne]);

            const loginCredentials = {
                email: userOne.email,
                password: "incorrect-password",
            };

            const res = await request(app)
                .post(loginRoute)
                .send(loginCredentials)
                .expect(httpStatus.UNAUTHORIZED);

            expect(res.body).toEqual({
                code: httpStatus.UNAUTHORIZED,
                message: "Incorrect email or password",
            });
        });
    });

    describe(`POST ${logoutRoute}`, () => {
        test("Should return 204 and remove refreshToken if it is valid", async () => {
            await insertUsers([userOne]);

            const expires = dayjs().add(
                configs.jwt.refreshExpirationDays,
                "days"
            );
            const refreshToken = tokenService.generateToken(
                userOne._id,
                expires,
                tokenTypes.REFRESH
            );

            await tokenService.saveToken(
                refreshToken,
                userOne._id,
                expires,
                tokenTypes.REFRESH
            );

            await request(app)
                .post(logoutRoute)
                .send({ refreshToken })
                .expect(httpStatus.NO_CONTENT);

            const savedRefreshToken = await Token.findOne({
                token: refreshToken,
            });
            expect(savedRefreshToken).toBeNull();
        });

        test("Should return 404 if refreshToken not found", async () => {
            await insertUsers([userOne]);

            const expires = dayjs().add(
                configs.jwt.refreshExpirationDays,
                "days"
            );
            const refreshToken = tokenService.generateToken(
                userOne._id,
                expires,
                tokenTypes.REFRESH
            );

            await request(app)
                .post(logoutRoute)
                .send({ refreshToken })
                .expect(httpStatus.NOT_FOUND);
        });
    });
});
