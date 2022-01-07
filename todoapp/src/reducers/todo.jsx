import {
    ADD_NEW_LIST,
    ADD_NEW_TODO,
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

const storage = (() => {
    const storageName = "todo_app";
    const dataString = window.localStorage.getItem(storageName);

    let data = {};

    if (dataString) {
        data = JSON.parse(dataString);
    }

    const get = (name) => {
        return data[name] || null;
    };

    const set = (name, value) => {
        data[name] = value;
        window.localStorage.setItem(storageName, JSON.stringify(data));
    };

    return {
        get,
        set,
    };
})();

const initialState = {
    todos: storage.get("todos") || [],
    newTodo: "",
    isNewInputFocused: false,
    editingTodoId: null,
    editingTodoValue: null,
    newList: "",
    isShowAddListForm: false,
    lists: storage.get("lists") || [
        {
            id: 220400,
            name: "Tất cả công việc",
            isDefault: true,
        },
    ],
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
                        isDone: action.payload.isDone,
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
            const { id: editedTodoId, job: newJob } = action.payload;
            const newTodos = state.todos.map((todo) => {
                if (todo.id === editedTodoId) {
                    return {
                        ...todo,
                        job: newJob,
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

        default: {
            const { type } = action;
            if (!type.includes("@@")) {
                console.warn(`Action '${action.type}' is invalid! (on todoReducer)`);
            }
            return state;
        }
    }
};

export default todoReducer;
