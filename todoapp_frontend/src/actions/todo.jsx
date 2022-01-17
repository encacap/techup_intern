import {
    ADD_NEW_LIST,
    ADD_NEW_TODO,
    EDIT_LIST,
    EDIT_TODO,
    MARK_TODO_DONE,
    REMOVE_LIST,
    REMOVE_TODO,
    SET_ADD_LIST_FORM_STATUS,
    SET_EDITING_LIST,
    SET_EDITING_TODO_ID,
    SET_EDITING_TODO_VALUE,
    SET_NEW_INPUT_STATUS,
    SET_NEW_LIST,
    SET_NEW_TODO,
    SET_LISTS,
    SET_LOADING_LIST_STATUS,
    SET_SELECTED_LIST,
    SET_TODOS,
} from "../constants/todo";

export const setTodos = (todos) => ({
    type: SET_TODOS,
    payload: todos,
});

export const setNewTodo = (newTodo) => ({
    type: SET_NEW_TODO,
    payload: newTodo,
});

export const addNewTodo = (newTodo) => ({
    type: ADD_NEW_TODO,
    payload: newTodo,
});

export const markTodoDone = (todoId, isCompleted) => ({
    type: MARK_TODO_DONE,
    payload: {
        id: todoId,
        isCompleted,
    },
});

export const editTodo = (newTodo) => ({
    type: EDIT_TODO,
    payload: newTodo,
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

export const setLists = (payload) => ({
    type: SET_LISTS,
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

export const setSelectedList = (listId) => ({
    type: SET_SELECTED_LIST,
    payload: listId,
});

export const setEditingList = (newName) => ({
    type: SET_EDITING_LIST,
    payload: newName,
});

export const setLoadingListStatus = (isLoading) => ({
    type: SET_LOADING_LIST_STATUS,
    payload: isLoading,
});
