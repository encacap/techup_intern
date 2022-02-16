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
    SET_SELECTED_LIST,
    SET_LISTS,
    SET_TODOS,
    SET_LOADING_LIST_STATUS,
} from "../constants/todo";

import storage from "../utils/storage";

const initialState = {
    todos: storage.get("todos") || [],
    newTodo: "",
    isNewInputFocused: false,
    editingTodoId: null,
    editingTodoValue: null,
    newList: "",
    isShowAddListForm: false,
    lists: [
        {
            id: "220400",
            name: "Tất cả công việc",
            isDefault: true,
        },
    ],
    selectedListId: null,
    editingList: null,
    isLoadedList: false,
};

const todoReducer = (state = initialState, action) => {
    const { type, payload } = action;

    const saveTodos = (data) => {
        storage.set("todos", data);
    };

    const saveLists = (data) => {
        storage.set("lists", data);
    };

    switch (type) {
        case SET_TODOS: {
            return {
                ...state,
                todos: payload,
            };
        }

        case SET_NEW_TODO: {
            return {
                ...state,
                newTodo: payload,
            };
        }

        case ADD_NEW_TODO: {
            const newTodos = [...state.todos, payload];

            saveTodos(newTodos);

            return {
                ...state,
                todos: newTodos,
            };
        }

        case MARK_TODO_DONE: {
            const { id: todoId } = action.payload;
            const newTodos = state.todos.map((todo) => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        isCompleted: action.payload.isCompleted,
                    };
                }
                return todo;
            });

            saveTodos(newTodos);

            return {
                ...state,
                todos: newTodos,
            };
        }

        case EDIT_TODO: {
            const updatedTodo = payload;
            const newTodos = state.todos.map((todo) => {
                if (todo.id === updatedTodo.id) {
                    return updatedTodo;
                }
                return todo;
            });

            saveTodos(newTodos);

            return {
                ...state,
                todos: newTodos,
            };
        }

        case REMOVE_TODO: {
            const removedTodoId = action.payload;
            const newTodos = state.todos.filter((todo) => todo.id !== removedTodoId);

            saveTodos(newTodos);

            return {
                ...state,
                todos: newTodos,
            };
        }

        case SET_NEW_INPUT_STATUS: {
            return {
                ...state,
                isNewInputFocused: action.payload,
            };
        }

        case SET_EDITING_TODO_ID: {
            return {
                ...state,
                editingTodoId: payload,
            };
        }

        case SET_EDITING_TODO_VALUE: {
            return {
                ...state,
                editingTodoValue: payload,
            };
        }

        case SET_NEW_LIST: {
            return {
                ...state,
                newList: payload,
            };
        }

        case SET_LISTS: {
            return {
                ...state,
                lists: [
                    {
                        id: "220400",
                        name: "Tất cả công việc",
                        isDefault: true,
                    },
                    ...payload,
                ],
            };
        }

        case ADD_NEW_LIST: {
            const newLists = [...state.lists, payload];

            saveLists(newLists);

            return {
                ...state,
                lists: newLists,
            };
        }

        case SET_ADD_LIST_FORM_STATUS: {
            return {
                ...state,
                isShowAddListForm: payload,
            };
        }

        case EDIT_LIST: {
            const { id: editedListId, name: newName } = payload;
            const newLists = state.lists.map((list) => {
                if (list.id === editedListId) {
                    return {
                        ...list,
                        name: newName,
                    };
                }
                return list;
            });
            return {
                ...state,
                lists: newLists,
            };
        }

        case REMOVE_LIST: {
            const removedListId = action.payload;
            const newLists = state.lists.filter((list) => list.id !== removedListId);
            const newTodos = state.todos.filter((todo) => todo.listId !== removedListId);
            saveLists(newLists);
            saveTodos(newTodos);
            return {
                ...state,
                lists: newLists,
                todos: newTodos,
            };
        }

        case SET_SELECTED_LIST: {
            return {
                ...state,
                selectedListId: payload,
            };
        }

        case SET_EDITING_LIST: {
            return {
                ...state,
                editingList: payload,
            };
        }

        case SET_LOADING_LIST_STATUS: {
            return {
                ...state,
                isLoadedList: payload,
            };
        }

        default: {
            return state;
        }
    }
};

export default todoReducer;
