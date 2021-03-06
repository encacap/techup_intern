const TodoItem = ({
    todo,
    isFinal,
    isEditing,
    value,
    onMarkDone,
    onRemove,
    onDoubleClick,
    onEditing,
    onEdit,
    onCancelEdit,
}) => {
    return (
        <li
            className={`flex justify-between py-4 ${isFinal && "border-b-2 border-gray-100"}`}
            id={`todo_${todo.id}`}
            onDoubleClick={() => onDoubleClick(todo.id)}
        >
            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="complete"
                    className="mr-5 mt-0.5"
                    onChange={() => onMarkDone(todo.id)}
                    checked={todo.isCompleted}
                />
                <span className={`${todo.isCompleted ? "line-through text-gray-400" : ""} ${isEditing && "hidden"}`}>
                    {todo.name}
                </span>
                <form action="" className={`${!isEditing && "hidden"}`} onSubmit={(e) => onEdit(e)}>
                    <input
                        type="text"
                        name="edit_todo"
                        placeholder="What are you working on?"
                        value={value !== null ? value : todo.name}
                        onChange={onEditing}
                        onBlur={onCancelEdit}
                        className="border-none outline-none"
                    />
                </form>
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
