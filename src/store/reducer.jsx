import { SET_TODO_INPUT, ADD_TODO, FOCUS_TODO_INPUT, MARK_TODO_DONE, REMOVE_TODO } from "./constants";

const initState = {
    todoInput: "",
    todos: [],
    isInputFocused: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_TODO_INPUT: {
            return {
                ...state,
                todoInput: action.payload,
            };
        }
        case ADD_TODO: {
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        }
        case FOCUS_TODO_INPUT: {
            return {
                ...state,
                isInputFocused: action.payload,
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
            return {
                ...state,
                todos: [...todos],
            };
        }
        case REMOVE_TODO: {
            const todoId = action.payload;
            const newTodos = state.todos.filter((todo) => todo.id !== todoId);
            return {
                ...state,
                todos: [...newTodos],
            };
        }
        default:
            throw new Error(`Unexpected action: ${action.type}`);
    }
};

export { initState };
export default reducer;
