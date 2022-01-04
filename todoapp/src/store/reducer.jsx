import {
    SET_TODO_INPUT,
    ADD_TODO,
    SET_TODOS_FILTER,
    FOCUS_TODO_INPUT,
    MARK_TODO_DONE,
    REMOVE_TODO,
    SET_EDITING_TODO,
    EDIT_TODO,
} from "./constants";

const storage = (name) => {
    return {
        get: () => {
            const json = localStorage.getItem(name);
            return json ? JSON.parse(json) : undefined;
        },
        set: (value) => {
            localStorage.setItem(name, JSON.stringify(value));
        },
    };
};

const initState = {
    todoInput: "",
    todos: storage("todos").get() || [],
    isInputFocused: false,
    todosFilter: "all",
    editingTodoId: undefined,
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_TODO_INPUT: {
            return {
                ...state,
                todoInput: action.payload,
            };
        }
        case FOCUS_TODO_INPUT: {
            return {
                ...state,
                isInputFocused: action.payload,
            };
        }
        case SET_TODOS_FILTER: {
            return {
                ...state,
                todosFilter: action.payload,
            };
        }
        case ADD_TODO: {
            const newTodos = [...state.todos, action.payload];
            storage("todos").set(newTodos);
            return {
                ...state,
                todos: newTodos,
            };
        }
        case MARK_TODO_DONE: {
            const todoId = action.payload;
            const todos = state.todos.map((todo) => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        isDone: !todo.isDone,
                    };
                }
                return todo;
            });
            storage("todos").set(todos);
            return {
                ...state,
                todos: [...todos],
            };
        }
        case REMOVE_TODO: {
            const todoId = action.payload;
            const newTodos = state.todos.filter((todo) => todo.id !== todoId);
            storage("todos").set(newTodos);
            return {
                ...state,
                todos: [...newTodos],
            };
        }
        case SET_EDITING_TODO: {
            return {
                ...state,
                editingTodoId: action.payload,
            };
        }
        case EDIT_TODO: {
            const { todoId, newTodo } = action.payload;
            console.log(todoId, newTodo);
            const todos = state.todos.map((todo) => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        job: newTodo,
                    };
                }
                return todo;
            });
            storage("todos").set(todos);
            return {
                ...state,
                todos: [...todos],
            };
        }
        default:
            throw new Error(`Unexpected action: ${action.type}`);
    }
};

export { initState };
export default reducer;
