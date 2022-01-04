import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStore } from "../../store/";
import { actions } from "../../store";
import TodoItem from "../TodoItem";

const TodoList = () => {
    const [state, dispatch] = useStore();
    const { editingTodoId } = state;
    const [editingTodoInput, setEditingTodoInput] = useState(null);

    let { filter } = useParams();
    let todos = state.todos.filter((todo) => {
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
        const editingInput = editingTodoElement.querySelector("input[name=edit_todo]");
        editingInput.focus();
    }, [editingTodoId]);

    const handleMarkDone = (todoId) => {
        dispatch(actions.markTodoDone(todoId));
    };

    const handleRemove = (todoId) => {
        dispatch(actions.removeTodo(todoId));
    };

    const handleDoubleClick = (todoId) => {
        dispatch(actions.setEditingTodo(todoId));
    };

    const handleEdit = (e) => {
        e.preventDefault();

        dispatch(actions.editTodo(editingTodoId, editingTodoInput));
        dispatch(actions.setEditingTodo(null));
    };

    return (
        <div>
            {todos.length === 0 ? (
                <div className="px-4 py-10 rounded-b-md bg-gray-100 text-gray-400 text-center">Nothing here =((</div>
            ) : (
                <ul className="list-none border-2 border-gray-100 rounded-b-md px-6 select-none">
                    {todos.map((todo, index) => (
                        <TodoItem
                            todo={todo}
                            isFinal={index !== todos.length - 1}
                            isEditing={todo.id === editingTodoId}
                            value={editingTodoInput}
                            onEditing={setEditingTodoInput}
                            onMarkDone={handleMarkDone}
                            onRemove={handleRemove}
                            onDoubleClick={handleDoubleClick}
                            onEdit={handleEdit}
                            key={todo.id}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;
