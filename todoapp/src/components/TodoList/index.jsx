import { useStore } from "../../store/";
import { actions } from "../../store";
import TodoItem from "../TodoItem";

const TodoList = ({ filter }) => {
    const [state, dispatch] = useStore();
    let todos = state.todos.filter((todo) => {
        if (!filter || filter === "all") {
            return todo;
        } else if (filter === "unfinished") {
            return !todo.isDone;
        }
        return todo.isDone;
    });
    const handleMarkDone = (todoId) => {
        dispatch(actions.markTodoDone(todoId));
    };

    const handleRemove = (todoId) => {
        dispatch(actions.removeTodo(todoId));
    };

    return (
        <div>
            {todos.length === 0 ? (
                <div className="px-4 py-10 rounded-b-md bg-gray-100 text-gray-400 text-center">Nothing here =((</div>
            ) : (
                <ul className="list-none border-2 border-gray-100 rounded-b-md px-6">
                    {todos.map((todo, index) => (
                        <TodoItem
                            todo={todo}
                            isFinal={index !== todos.length - 1}
                            onMarkDone={handleMarkDone}
                            onRemove={handleRemove}
                            key={todo.id}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;
