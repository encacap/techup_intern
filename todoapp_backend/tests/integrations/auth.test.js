const request = require("supertest");
const casual = require("casual");
const httpStatus = require("http-status");
const dayjs = require("dayjs");

const app = require("../../src/app");

const setupTestDB = require("../utils/setupTestDB");
const { User, Token } = require("../../src/models");
const { tokenService, emailService, authService } = require("../../src/services");

const configs = require("../../src/config/config");
const { tokenTypes } = require("../../src/config/tokens");

const { userOne, insertUsers } = require("../fixtures/user.fixture");
const { useOneAccessToken } = require("../fixtures/token.fixture");

setupTestDB();

describe("Auth", () => {
    const registerRoute = "/v1/auth/register";
    const loginRoute = "/v1/auth/login";
    const logoutRoute = "/v1/auth/logout";
    const refreshTokensRoute = "/v1/auth/refresh-tokens";
    const sendVerificationEmailRoute = "/v1/auth/send-verification-email";
    const verifyEmailRoute = "/v1/auth/verify-email";
    const forgotPasswordRoute = "/v1/auth/forgot-password";
    const resetPasswordRoute = "/v1/auth/reset-password";

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
            await request(app).post(registerRoute).send(newUser).expect(httpStatus.BAD_REQUEST);
        });

        test("Should return 400 if email is already exists", async () => {
            await insertUsers([userOne]);
            newUser.email = userOne.email;
            await request(app).post(registerRoute).send(newUser).expect(httpStatus.BAD_REQUEST);
        });
    });

    describe(`POST ${loginRoute}`, () => {
        test("Should return 200 and user data if request is OK", async () => {
            await insertUsers([userOne]);

            const loginCredentials = {
                email: userOne.email,
                password: userOne.password,
            };

            const res = await request(app).post(loginRoute).send(loginCredentials);

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

            const res = await request(app).post(loginRoute).send(loginCredentials).expect(httpStatus.UNAUTHORIZED);

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

            const res = await request(app).post(loginRoute).send(loginCredentials).expect(httpStatus.UNAUTHORIZED);

            expect(res.body).toEqual({
                code: httpStatus.UNAUTHORIZED,
                message: "Incorrect email or password",
            });
        });
    });

    describe(`POST ${logoutRoute}`, () => {
        test("Should return 204 and remove refreshToken if it is valid", async () => {
            await insertUsers([userOne]);

            const expires = dayjs().add(configs.jwt.refreshExpirationDays, "days");
            const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH);

            await tokenService.saveToken(refreshToken, userOne._id, expires, tokenTypes.REFRESH);

            await request(app).post(logoutRoute).send({ refreshToken }).expect(httpStatus.NO_CONTENT);

            const savedRefreshToken = await Token.findOne({
                token: refreshToken,
            });
            expect(savedRefreshToken).toBeNull();
        });

        test("Should return 404 if refreshToken not found", async () => {
            await insertUsers([userOne]);

            const expires = dayjs().add(configs.jwt.refreshExpirationDays, "days");
            const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH);

            await request(app).post(logoutRoute).send({ refreshToken }).expect(httpStatus.NOT_FOUND);
        });
    });

    describe(`POST ${refreshTokensRoute}`, () => {
        test("Should return 200 and new tokens if request is OK", async () => {
            await insertUsers([userOne]);

            const expires = dayjs().add(configs.jwt.refreshExpirationDays, "days");

            const refreshToken = tokenService.generateToken(userOne._id, expires, tokenTypes.REFRESH);

            await tokenService.saveToken(refreshToken, userOne._id, expires, tokenTypes.REFRESH);

            const res = await request(app).post(refreshTokensRoute).send({ refreshToken });

            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toEqual({
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

        test("Should return 401 if refreshToken is invalid", async () => {
            const refreshToken = "invalid-refresh-token";

            await request(app).post(refreshTokensRoute).send({ refreshToken }).expect(httpStatus.UNAUTHORIZED);
        });
    });

    describe(`POST ${sendVerificationEmailRoute}`, () => {
        beforeEach(() => {
            jest.spyOn(emailService.transport, "sendMail").mockResolvedValue();
        });

        test("Should return 204 and send verification email to the user", async () => {
            insertUsers([userOne]);
            const sendVerificationEmailSpy = jest.spyOn(emailService, "sendVerificationEmail");

            await request(app)
                .post(sendVerificationEmailRoute)
                .send({ callback: "any" })
                .set("Authorization", `Bearer ${useOneAccessToken}`)
                .expect(httpStatus.NO_CONTENT);

            expect(sendVerificationEmailSpy).toHaveBeenCalledWith(
                expect.anything(Object),
                expect.anything(String),
                expect.anything(String)
            );

            const verifyEmailToken = sendVerificationEmailSpy.mock.calls[0][1];
            const savedVerifyEmailToken = await Token.findOne({
                token: verifyEmailToken,
                user: userOne._id,
            });

            expect(savedVerifyEmailToken).toBeDefined();
        });

        test("Should return 400 if missing callbackURL in request body", async () => {
            insertUsers([userOne]);

            await request(app)
                .post(sendVerificationEmailRoute)
                .send()
                .set("Authorization", `Bearer ${useOneAccessToken}`)
                .expect(httpStatus.BAD_REQUEST);
        });

        test("Should return 401 if unauthorized", async () => {
            await request(app).post(sendVerificationEmailRoute).send({ callback: "any" }).expect(httpStatus.UNAUTHORIZED);
        });
    });

    describe(`POST ${verifyEmailRoute}`, () => {
        test("Should return 204 and verify user's email if the token is valid", async () => {
            await insertUsers([userOne]);

            const verifyEmailTokenExpires = dayjs().add(configs.jwt.verifyEmailExpirationMinutes, "minutes");
            const verifyEmailToken = tokenService.generateToken(
                userOne._id,
                verifyEmailTokenExpires,
                tokenTypes.VERIFY_EMAIL
            );

            await tokenService.saveToken(verifyEmailToken, userOne._id, verifyEmailTokenExpires, tokenTypes.VERIFY_EMAIL);

            await request(app).post(verifyEmailRoute).send({ token: verifyEmailToken }).expect(httpStatus.NO_CONTENT);

            const savedUser = await User.findById(userOne._id);
            expect(savedUser.isEmailVerified).toBe(true);

            const savedVerifyEmailTokens = await Token.countDocuments({
                user: userOne._id,
                type: tokenTypes.VERIFY_EMAIL,
            });
            expect(savedVerifyEmailTokens).toBe(0);
        });

        test("Should return 400 if missing token", async () => {
            await request(app).post(verifyEmailRoute).send().expect(httpStatus.BAD_REQUEST);
        });

        test("Should return 401 if token is invalid", async () => {
            const res = await request(app)
                .post(verifyEmailRoute)
                .send({ token: "invalid-token" })
                .expect(httpStatus.UNAUTHORIZED);

            expect(res.body.message).toEqual("Email verification failed");
        });
    });

    describe(`POST ${forgotPasswordRoute}`, () => {
        beforeEach(() => {
            jest.spyOn(emailService.transport, "sendMail").mockResolvedValue();
        });

        test("Should return 204 and send forgot password email to the user", async () => {
            insertUsers([userOne]);
            const sendForgotPasswordEmailSpy = jest.spyOn(emailService, "sendPasswordResetEmail");

            await request(app)
                .post(forgotPasswordRoute)
                .send({ email: userOne.email, callback: "any" })
                .expect(httpStatus.NO_CONTENT);

            expect(sendForgotPasswordEmailSpy).toHaveBeenCalledWith(
                expect.anything(Object),
                expect.anything(String),
                expect.anything(String)
            );

            const savedPasswordResetToken = await Token.findOne({
                token: sendForgotPasswordEmailSpy.mock.calls[0][1],
                user: userOne._id,
            });

            expect(savedPasswordResetToken).toBeDefined();
        });

        test("Should return 400 if missing email or callbackURL", async () => {
            await request(app).post(forgotPasswordRoute).send().expect(httpStatus.BAD_REQUEST);
        });

        test("Should return 400 if email is invalid", async () => {
            const res = await request(app)
                .post(forgotPasswordRoute)
                .send({ email: "invalid-email", callback: "any" })
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toEqual(expect.stringContaining("must be a valid email"));
        });

        test("Should return 404 if user doesn't exists", async () => {
            await request(app)
                .post(forgotPasswordRoute)
                .send({ email: userOne.email, callback: "any" })
                .expect(httpStatus.NOT_FOUND);
        });
    });

    describe(`POST ${resetPasswordRoute}`, () => {
        test("Should return 204 and update user's password if request is OK", async () => {
            insertUsers([userOne]);
            const resetPasswordSpy = jest.spyOn(authService, "resetPassword");

            const resetPasswordTokenExpires = dayjs().add(configs.jwt.resetPasswordExpirationMinutes, "minutes");
            const resetPasswordToken = tokenService.generateToken(
                userOne._id,
                resetPasswordTokenExpires,
                tokenTypes.PASSWORD_RESET
            );
            await tokenService.saveToken(
                resetPasswordToken,
                userOne._id,
                resetPasswordTokenExpires,
                tokenTypes.RESET_PASSWORD
            );

            await request(app)
                .post(resetPasswordRoute)
                .send({
                    token: resetPasswordToken,
                    password: "new-password1",
                    confirmPassword: "new-password1",
                })
                .expect(httpStatus.NO_CONTENT);

            expect(resetPasswordSpy).toHaveBeenCalledWith(resetPasswordToken, "new-password1", "new-password1");

            const savedPasswordResetTokens = await Token.countDocuments({
                user: userOne._id,
                type: tokenTypes.PASSWORD_RESET,
            });

            expect(savedPasswordResetTokens).toBe(0);
        });

        test("Should return 400 if missing arguments", async () => {
            await request(app).post(resetPasswordRoute).send().expect(httpStatus.BAD_REQUEST);
        });

        test("Should return 400 if passwords does not match", async () => {
            const res = await request(app)
                .post(resetPasswordRoute)
                .send({
                    token: "any",
                    password: "new-password1",
                    confirmPassword: "new-password2",
                })
                .expect(httpStatus.BAD_REQUEST);

            expect(res.body.message).toEqual("Passwords do not match");
        });

        test("Should return 401 if token is invalid", async () => {
            const res = await request(app)
                .post(resetPasswordRoute)
                .send({
                    token: "invalid-token",
                    password: "new-password1",
                    confirmPassword: "new-password1",
                })
                .expect(httpStatus.UNAUTHORIZED);

            expect(res.body.message).toEqual("Password reset failed");
        });
    });
});
