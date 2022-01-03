import { useStore } from "../../store/";
import { actions } from "../../store";
import TodoItem from "../TodoItem";

const TodoList = () => {
    const [{ todos }, dispatch] = useStore();

    const handleMarkDone = (todoId) => {
        dispatch(actions.markTodoDone(todoId));
    };

    const handleRemove = (todoId) => {
        dispatch(actions.removeTodo(todoId));
    };

    return (
        <div className="mt-10">
            {todos.length === 0 ? (
                <div className="px-4 py-10 rounded-md bg-gray-100 text-gray-400 text-center">Nothing here =((</div>
            ) : (
                <ul className="list-none border-2 border-gray-100 rounded-md px-6">
                    {todos.map((todo, index) => (
                        <TodoItem
                            todo={todo}
                            isFinal={index === todos.length - 1}
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
