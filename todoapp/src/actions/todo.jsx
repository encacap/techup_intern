import {
    ADD_NEW_LIST,
    ADD_NEW_TODO,
    EDIT_LIST,
    EDIT_TODO,
    MARK_TODO_DONE,
    REMOVE_LIST,
    REMOVE_TODO,
    SET_ADD_LIST_FORM_STATUS,
    SET_EDITING_TODO_ID,
    SET_EDITING_TODO_VALUE,
    SET_NEW_INPUT_STATUS,
    SET_NEW_LIST,
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

export const setNewList = (payload) => ({
    type: SET_NEW_LIST,
    payload,
});

export const addNewList = (payload) => ({
    type: ADD_NEW_LIST,
    payload,
});

export const setAddListFormStatus = (payload) => ({
    type: SET_ADD_LIST_FORM_STATUS,
    payload,
});

export const editList = (listId, newName) => ({
    type: EDIT_LIST,
    payload: {
        id: listId,
        name: newName,
    },
});

export const removeList = (listId) => ({
    type: REMOVE_LIST,
    payload: listId,
});
