const TodoItem = ({ todo, isFinal, onMarkDone, onRemove }) => {
    return (
        <li className={`flex justify-between py-4 ${isFinal && "border-b-2 border-gray-100"}`}>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="complete"
                    className="mr-5 mt-0.5"
                    onChange={() => onMarkDone(todo.id)}
                    checked={todo.isDone}
                />
                <span className={todo.isDone ? "line-through text-gray-400" : ""}>{todo.job}</span>
            </div>
            <div
                className="flex items-center pb-px text-xs bg-gray-100 px-2 rounded-md text-gray-400 cursor-pointer hover:bg-slate-200 duration-200"
                onClick={() => onRemove(todo.id)}
            >
                Remove
            </div>
        </li>
    );
};

export default TodoItem;
