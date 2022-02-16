import request from "../utils/request";

const createTodo = async (userId, listId, todoBody) => {
    return request.post(`/users/${userId}/lists/${listId}/todos`, todoBody);
};

const getTodos = async (userId) => {
    return request.get(`/users/${userId}/todos`);
};

const getTodosByListId = async (userId, listId) => {
    return request.get(`/users/${userId}/lists/${listId}/todos`);
};

const updateTodoById = async (userId, todoId, todoBody) => {
    return request.patch(`/users/${userId}/todos/${todoId}`, todoBody);
};

const deleteTodoById = async (userId, todoId) => {
    return request.delete(`/users/${userId}/todos/${todoId}`);
};

export { createTodo, getTodos, getTodosByListId, updateTodoById, deleteTodoById };
