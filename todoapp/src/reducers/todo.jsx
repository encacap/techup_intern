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
    editingTodoValue: "",
};

const todoReducer = (state = initialState, action) => {
    const { type, payload } = action;

    const saveTodos = (data) => {
        storage.set("todos", data);
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
                editingTodoId: action.payload,
            };
        }

        case SET_EDITING_TODO_VALUE: {
            return {
                ...state,
                editingTodoValue: action.payload,
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
