const request = require("supertest");
const httpStatus = require("http-status");
const mongoose = require("mongoose");

const casual = require("casual");
const app = require("../../src/app");
const { userOne, insertUsers } = require("../fixtures/user.fixture");
const { listOne, insertLists } = require("../fixtures/list.fixture");
const { todoOne, todoTwo, insertTodos } = require("../fixtures/todo.fixture");
const { useOneAccessToken } = require("../fixtures/token.fixture");

const setupTestDB = require("../utils/setupTestDB");
const { List, Todo } = require("../../src/models");
const pick = require("../../src/utils/pick");

setupTestDB();

describe("Users", () => {
    const listsRoute = (userId) => `/v1/users/${userId || ":userId"}/lists`;
    const listRoute = (userId, listId) => `${listsRoute(userId)}/${listId || ":listId"}`;
    const todosRoute = (userId, listId) => `${listRoute(userId, listId)}/todos`;
    const todoRoute = (userId, listId, todoId) => `${todosRoute(userId, listId)}/${todoId || ":todoId"}`;
    const shorterTodosRoute = (userId) => `/v1/users/${userId || ":userId"}/todos`;
    const shorterTodoRoute = (userId, todoId) => `${shorterTodosRoute(userId)}/${todoId || ":todoId"}`;

    describe("Lists", () => {
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

    describe("Todos", () => {
        describe(`GET ${todosRoute()}`, () => {
            beforeEach(async () => {
                insertUsers([userOne]);
                insertLists([listOne]);
                insertTodos([todoOne, todoTwo]);
            });

            test("Should return 200 and todos if request is OK", async () => {
                const res = await request(app)
                    .get(todosRoute(userOne._id, listOne._id))
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    });

                expect(res.body).toHaveProperty("results");
                expect(res.body.results).toHaveLength(2);
            });

            test("Should return 200 and filtered by queries if request is OK", async () => {
                const expectedTodoStatus = "incomplete";
                const expectedTodoStatusBoolean = false;

                const res = await request(app)
                    .get(todosRoute(userOne._id, listOne._id))
                    .query({
                        status: expectedTodoStatus,
                    })
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    });

                expect(res.body).toHaveProperty("results");

                const todos = res.body.results;
                expect(todos).toHaveLength(1);
                todos.forEach((todo) => {
                    expect(todo.isCompleted).toBe(expectedTodoStatusBoolean);
                });
            });

            test("Should return 400 if objectIds is invalid", async () => {
                const res = await request(app)
                    .get(todosRoute(userOne._id, "invalid_objectid"))
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    });

                expect(res.status).toBe(httpStatus.BAD_REQUEST);
                expect(res.body.message).toEqual(expect.stringContaining("must be a valid mongo id"));
            });

            test("Should return 401 if unauthorized", async () => {
                await request(app).get(todosRoute(userOne._id, listOne._id)).expect(httpStatus.UNAUTHORIZED);
            });

            test("Should return 404 if list not found", () => {
                return request(app)
                    .get(todosRoute(userOne._id, mongoose.Types.ObjectId()))
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    })
                    .expect(httpStatus.NOT_FOUND);
            });
        });

        describe(`POST ${todosRoute()}`, () => {
            beforeEach(async () => {
                insertUsers([userOne]);
                insertLists([listOne]);
            });

            test("Should return 201 and todo if request is OK", async () => {
                const newTodoBody = pick(todoOne, ["name", "isCompleted"]);
                const res = await request(app)
                    .post(todosRoute(userOne._id, listOne._id))
                    .send(newTodoBody)
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    })
                    .expect(httpStatus.CREATED);

                expect(res.body).toHaveProperty("id");
                expect(res.body).toHaveProperty("name");
                expect(res.body).toHaveProperty("isCompleted");
                expect(res.body).toHaveProperty("user");
                expect(res.body).toHaveProperty("list");

                const savedTodo = await Todo.findById(res.body.id);
                expect(savedTodo).toBeDefined();
            });

            test("Should return 400 if missing arguments", async () => {
                const res = await request(app)
                    .post(todosRoute(userOne._id, listOne._id))
                    .send({
                        name: "Any name",
                    })
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    })
                    .expect(httpStatus.BAD_REQUEST);
                expect(res.body.message).toEqual(expect.stringContaining("is required"));
            });

            test("Should return 404 if list not found", async () => {
                const newTodoBody = pick(todoOne, ["name", "isCompleted"]);

                await request(app)
                    .post(todosRoute(userOne._id, mongoose.Types.ObjectId()))
                    .send(newTodoBody)
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    })
                    .expect(httpStatus.NOT_FOUND);
            });
        });

        describe(`PATCH ${todoRoute()}`, () => {
            beforeEach(async () => {
                insertUsers([userOne]);
                insertLists([listOne]);
                insertTodos([todoOne, todoTwo]);
            });

            test("Should return 200 and todo if request is OK", async () => {
                const res = await request(app)
                    .patch(todoRoute(userOne._id, listOne._id, todoOne._id))
                    .send({
                        name: todoOne.name,
                        isCompleted: !todoOne.isCompleted,
                    })
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    })
                    .expect(httpStatus.OK);

                expect(res.body).toHaveProperty("id");
                expect(res.body).toHaveProperty("name");
                expect(res.body).toHaveProperty("isCompleted");
                expect(res.body).toHaveProperty("user");
                expect(res.body).toHaveProperty("list");

                const savedTodo = await Todo.findById(res.body.id);
                expect(savedTodo).toBeDefined();
                expect(savedTodo.isCompleted).toBe(!todoOne.isCompleted);
            });

            test("Should return 401 if unauthorized", async () => {
                await request(app)
                    .patch(todoRoute(userOne._id, listOne._id, todoOne._id))
                    .send(pick(todoOne, ["name", "isCompleted"]))
                    .expect(httpStatus.UNAUTHORIZED);
            });
        });

        describe(`DELETE ${todoRoute()}`, () => {
            beforeEach(async () => {
                insertUsers([userOne]);
                insertLists([listOne]);
                insertTodos([todoOne, todoTwo]);
            });

            test("Should return 204 if request is OK", async () => {
                await request(app)
                    .delete(todoRoute(userOne._id, listOne._id, todoOne._id))
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    })
                    .expect(httpStatus.NO_CONTENT);

                const todo = await Todo.findById(todoOne._id);
                expect(todo).toBeNull();
            });

            test("Should return 401 if unauthorized", async () => {
                await request(app).delete(todoRoute(userOne._id, listOne._id, todoOne._id)).expect(httpStatus.UNAUTHORIZED);
            });

            test("Should return 404 if todo not found", () => {
                return request(app)
                    .delete(todoRoute(userOne._id, listOne._id, mongoose.Types.ObjectId()))
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    })
                    .expect(httpStatus.NOT_FOUND);
            });
        });
    });

    describe("Shorter todo", () => {
        describe(`GET ${shorterTodosRoute()}`, () => {
            beforeEach(async () => {
                insertUsers([userOne]);
                insertLists([listOne]);
                insertTodos([todoOne, todoTwo]);
            });

            test("Should return 200 and todos if request is OK", async () => {
                const res = await request(app)
                    .get(shorterTodosRoute(userOne._id))
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    });

                expect(res.body).toHaveProperty("results");
                expect(res.body.results).toHaveLength(2);
            });

            test("Should return 200 and filtered by queries if request is OK", async () => {
                const expectedTodoStatus = "incomplete";
                const expectedTodoStatusBoolean = false;

                const res = await request(app)
                    .get(shorterTodosRoute(userOne._id))
                    .query({
                        status: expectedTodoStatus,
                    })
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    });

                expect(res.body).toHaveProperty("results");

                const todos = res.body.results;
                expect(todos).toHaveLength(1);
                todos.forEach((todo) => {
                    expect(todo.isCompleted).toBe(expectedTodoStatusBoolean);
                });
            });

            test("Should return 401 if unauthorized", async () => {
                await request(app).get(todosRoute(userOne._id, listOne._id)).expect(httpStatus.UNAUTHORIZED);
            });
        });

        describe(`PATCH ${shorterTodoRoute()}`, () => {
            beforeEach(async () => {
                insertUsers([userOne]);
                insertLists([listOne]);
                insertTodos([todoOne, todoTwo]);
            });

            test("Should return 200 and todo if request is OK", async () => {
                const res = await request(app)
                    .patch(shorterTodoRoute(userOne._id, todoOne._id))
                    .send({
                        name: todoOne.name,
                        isCompleted: !todoOne.isCompleted,
                    })
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    })
                    .expect(httpStatus.OK);

                expect(res.body).toHaveProperty("id");
                expect(res.body).toHaveProperty("name");
                expect(res.body).toHaveProperty("isCompleted");
                expect(res.body).toHaveProperty("user");
                expect(res.body).toHaveProperty("list");

                const savedTodo = await Todo.findById(res.body.id);
                expect(savedTodo).toBeDefined();
                expect(savedTodo.isCompleted).toBe(!todoOne.isCompleted);
            });

            test("Should return 401 if unauthorized", async () => {
                await request(app)
                    .patch(shorterTodoRoute(userOne._id, todoOne._id))
                    .send(pick(todoOne, ["name", "isCompleted"]))
                    .expect(httpStatus.UNAUTHORIZED);
            });
        });

        describe(`DELETE ${shorterTodoRoute()}`, () => {
            beforeEach(async () => {
                insertUsers([userOne]);
                insertLists([listOne]);
                insertTodos([todoOne, todoTwo]);
            });

            test("Should return 204 if request is OK", async () => {
                await request(app)
                    .delete(shorterTodoRoute(userOne._id, todoOne._id))
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    })
                    .expect(httpStatus.NO_CONTENT);

                const todo = await Todo.findById(todoOne._id);
                expect(todo).toBeNull();
            });

            test("Should return 401 if unauthorized", async () => {
                await request(app).delete(shorterTodoRoute(userOne._id, todoOne._id)).expect(httpStatus.UNAUTHORIZED);
            });

            test("Should return 404 if todo not found", () => {
                return request(app)
                    .delete(shorterTodoRoute(userOne._id, mongoose.Types.ObjectId()))
                    .set({
                        Authorization: `Bearer ${useOneAccessToken}`,
                    })
                    .expect(httpStatus.NOT_FOUND);
            });
        });
    });
});
