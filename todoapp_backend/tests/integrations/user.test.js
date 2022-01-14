const request = require("supertest");
const httpStatus = require("http-status");

const casual = require("casual");
const app = require("../../src/app");
const { userOne, insertUsers } = require("../fixtures/user.fixture");
const { useOneAccessToken } = require("../fixtures/token.fixture");
const { listOne, insertLists } = require("../fixtures/list.fixture");

const setupTestDB = require("../utils/setupTestDB");
const { List } = require("../../src/models");

setupTestDB();

describe("Users", () => {
    const listsRoute = (userId) => `/v1/users/${userId || ":userId"}/lists`;
    const listRoute = (userId, listId) => `${listsRoute(userId)}/${listId || ":listId"}`;

    describe(`POST ${listsRoute()}`, () => {
        test("Should return 201 and list if request is OK", async () => {
            insertUsers([userOne]);
            const res = await request(app)
                .post(listsRoute(userOne._id))
                .set({
                    Authorization: `Bearer ${useOneAccessToken}`,
                })
                .send({
                    name: listOne.name,
                });

            expect(res.status).toBe(httpStatus.CREATED);
            expect(res.body).toEqual({
                id: expect.any(String),
                name: listOne.name,
                user: listOne.user.toString(),
            });

            const savedListId = res.body.id;

            const savedList = await List.findById(savedListId);
            expect(savedList).toBeDefined();
            expect(savedList.name).toEqual(listOne.name);
            expect(savedList.user).toStrictEqual(listOne.user);
        });

        test("Should return 400 if missing arguments", async () => {
            insertUsers([userOne]);
            const res = await request(app)
                .post(listsRoute(userOne._id))
                .set({
                    Authorization: `Bearer ${useOneAccessToken}`,
                })
                .send({});

            expect(res.status).toBe(httpStatus.BAD_REQUEST);
            expect(res.body.message).toEqual(expect.stringContaining("is required"));
        });

        test("Should return 401 if unauthorized", async () => {
            insertUsers([userOne]);
            await request(app)
                .post(listsRoute(userOne._id))
                .send({
                    name: listOne.name,
                })
                .expect(httpStatus.UNAUTHORIZED);
        });
    });

    describe(`GET ${listsRoute()}`, () => {
        test("Should return 200 and lists if request is OK", async () => {
            insertUsers([userOne]);
            insertLists([listOne]);

            const res = await request(app)
                .get(listsRoute(userOne._id))
                .set({
                    Authorization: `Bearer ${useOneAccessToken}`,
                });

            expect(res.body).toHaveProperty("results");
        });

        test("Should return 401 if unauthorized", async () => {
            insertUsers([userOne]);

            await request(app).get(listsRoute(userOne._id)).expect(httpStatus.UNAUTHORIZED);
        });
    });

    describe(`PATCH ${listRoute()}`, () => {
        test("Should return 200 and list if request is OK", async () => {
            insertUsers([userOne]);
            insertLists([listOne]);

            listOne.name = casual.title;

            const res = await request(app)
                .patch(listRoute(userOne._id, listOne._id))
                .send({
                    name: listOne.name,
                })
                .set({
                    Authorization: `Bearer ${useOneAccessToken}`,
                });

            expect(res.status).toBe(httpStatus.OK);
            expect(res.body).toEqual({
                id: listOne._id.toString(),
                name: listOne.name,
                user: listOne.user.toString(),
            });

            const savedList = await List.findById(listOne._id);
            expect(savedList.name).toEqual(listOne.name);
        });

        test("Should return 400 if missing arguments", async () => {
            insertUsers([userOne]);

            await request(app)
                .patch(listRoute(userOne._id, listOne._id))
                .set({
                    Authorization: `Bearer ${useOneAccessToken}`,
                })
                .send({})
                .expect(httpStatus.BAD_REQUEST);
        });

        test("Should return 401 if unauthorized", async () => {
            insertUsers([userOne]);
            insertLists([listOne]);

            await request(app)
                .patch(listRoute(userOne._id, listOne._id))
                .send({
                    name: listOne.name,
                })
                .expect(httpStatus.UNAUTHORIZED);
        });

        test("Should return 404 if list not found", async () => {
            insertUsers([userOne]);

            await request(app)
                .patch(listRoute(userOne._id, listOne._id))
                .send({
                    name: listOne.name,
                })
                .set({
                    Authorization: `Bearer ${useOneAccessToken}`,
                })
                .expect(httpStatus.NOT_FOUND);
        });
    });

    describe(`DELETE ${listRoute()}`, () => {
        test("Should return 204 if request is OK", async () => {
            insertUsers([userOne]);
            insertLists([listOne]);

            const res = await request(app)
                .delete(listRoute(userOne._id, listOne._id))
                .set({
                    Authorization: `Bearer ${useOneAccessToken}`,
                });

            expect(res.status).toBe(httpStatus.NO_CONTENT);

            const savedList = await List.findById(listOne._id);
            expect(savedList).toBeNull();
        });

        test("Should return 401 if unauthorized", async () => {
            insertUsers([userOne]);

            await request(app).delete(listRoute(userOne._id, listOne._id)).expect(httpStatus.UNAUTHORIZED);
        });

        test("Should return 404 if list not found", async () => {
            insertUsers([userOne]);

            await request(app)
                .delete(listRoute(userOne._id, listOne._id))
                .set({
                    Authorization: `Bearer ${useOneAccessToken}`,
                })
                .expect(httpStatus.NOT_FOUND);
        });
    });
});
