import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../actions/todo";
import TodoItem from "../TodoItem";

const TodoList = () => {
    const { editingTodoId, editingTodoValue, todos } = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    const { filter = "all" } = useParams();
    const filteredTodos = todos.filter((todo) => {
        if (!filter || filter === "all") {
            return todo;
        } else if (filter === "unfinished") {
            return !todo.isDone;
        }
        return todo.isDone;
    });

    useEffect(() => {
        if (!editingTodoId) return;
        const editingTodoElement = document.querySelector(`#todo_${editingTodoId}`);
        if (!editingTodoElement) return;
        const editingInput = editingTodoElement.querySelector("input[name=edit_todo]");
        editingInput.focus();
    }, [editingTodoId]);

    const handleMarkDone = (todoId) => {
        const selectedTodo = todos.find((todo) => todo.id === todoId);
        dispatch(actions.markTodoDone(todoId, !selectedTodo.isDone));
    };

    const handleRemove = (todoId) => {
        dispatch(actions.removeTodo(todoId));
    };

    const handleDoubleClick = (todoId) => {
        dispatch(actions.setEditingTodoId(todoId));
    };

    const handleEdit = (e) => {
        e.preventDefault();

        dispatch(actions.editTodo(editingTodoId, editingTodoValue));
        dispatch(actions.setEditingTodoId(null));
        dispatch(actions.setEditingTodoValue(""));
    };

    const handleEditing = ({ target }) => {
        dispatch(actions.setEditingTodoValue(target.value));
    };

    const handleCancelEdit = () => {
        dispatch(actions.setEditingTodoId(null));
    };

    return (
        <div>
            {filteredTodos.length === 0 ? (
                <div className="px-4 py-10 rounded-b-md bg-gray-100 text-gray-400 text-center">Nothing here =((</div>
            ) : (
                <ul className="list-none border-2 border-gray-100 rounded-b-md px-6 select-none">
                    {filteredTodos.map((todo, index) => (
                        <TodoItem
                            todo={todo}
                            isFinal={index !== filteredTodos.length - 1}
                            isEditing={todo.id === editingTodoId}
                            value={editingTodoValue}
                            onEditing={handleEditing}
                            onMarkDone={handleMarkDone}
                            onRemove={handleRemove}
                            onDoubleClick={handleDoubleClick}
                            onEdit={handleEdit}
                            onCancelEdit={handleCancelEdit}
                            key={todo.id}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;
