import {
    SET_TODO_INPUT,
    ADD_TODO,
    FOCUS_TODO_INPUT,
    SET_TODOS_FILTER,
    MARK_TODO_DONE,
    REMOVE_TODO,
    SET_EDITING_TODO,
    EDIT_TODO,
} from "./constants";

export const setTodoInput = (payload) => ({
    type: SET_TODO_INPUT,
    payload,
});

export const setTodosFilter = (payload) => ({
    type: SET_TODOS_FILTER,
    payload,
});

export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload,
});

export const focusTodoInput = (payload) => ({
    type: FOCUS_TODO_INPUT,
    payload,
});

export const markTodoDone = (payload) => ({
    type: MARK_TODO_DONE,
    payload,
});

export const removeTodo = (payload) => ({
    type: REMOVE_TODO,
    payload,
});

export const setEditingTodo = (payload) => ({
    type: SET_EDITING_TODO,
    payload,
});

export const editTodo = (todoId, newTodo) => ({
    type: EDIT_TODO,
    payload: {
        todoId,
        newTodo,
    },
});
