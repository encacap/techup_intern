import {
    ADD_NEW_TODO,
    EDIT_TODO,
    MARK_TODO_DONE,
    REMOVE_TODO,
    SET_EDITING_TODO_ID,
    SET_EDITING_TODO_VALUE,
    SET_NEW_INPUT_STATUS,
    SET_NEW_TODO,
} from "../constants/todo";

export const setNewTodo = (newTodo) => ({
    type: SET_NEW_TODO,
    payload: newTodo,
});

export const addNewTodo = (newTodo) => ({
    type: ADD_NEW_TODO,
    payload: newTodo,
});

export const markTodoDone = (todoId, isDone) => ({
    type: MARK_TODO_DONE,
    payload: {
        id: todoId,
        isDone,
    },
});

export const editTodo = (todoId, newJob) => ({
    type: EDIT_TODO,
    payload: {
        id: todoId,
        job: newJob,
    },
});

export const removeTodo = (todoId) => ({
    type: REMOVE_TODO,
    payload: todoId,
});

export const setNewInputStatus = (isFocus) => ({
    type: SET_NEW_INPUT_STATUS,
    payload: isFocus,
});

export const setEditingTodoId = (todoId) => ({
    type: SET_EDITING_TODO_ID,
    payload: todoId,
});

export const setEditingTodoValue = (value) => ({
    type: SET_EDITING_TODO_VALUE,
    payload: value,
});
