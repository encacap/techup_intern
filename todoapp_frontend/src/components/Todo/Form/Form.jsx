import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../../actions/todo";

import { todoService } from "../../../services";

const TodoForm = ({ disabled }) => {
    const { newTodo, isNewInputFocused } = useSelector((state) => state.todo);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { listId } = useParams();

    const inputRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await todoService.createTodo(user.id, listId, { name: newTodo, isCompleted: false });
        dispatch(actions.addNewTodo(data));
        dispatch(actions.setNewTodo(""));

        inputRef.current.focus();
    };

    const handleInput = ({ target }) => {
        dispatch(actions.setNewTodo(target.value));
    };

    const handleFocus = () => {
        dispatch(actions.setNewInputStatus(true));
    };

    const handleBlur = () => {
        dispatch(actions.setNewInputStatus(false));
    };

    return (
        <form
            className={`relative border-2 ${isNewInputFocused ? "border-blue-500" : "border-gray-100"} rounded-md flex`}
            onSubmit={handleSubmit}
        >
            {disabled && <div className="absolute top-0 right-0 bottom-0 left-0 rounded-md"></div>}
            <input
                type="text"
                placeholder="What do you want?"
                className="w-full px-6 py-4 rounded-l-md outline-none"
                value={newTodo}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
                disabled={disabled}
            />
            <button
                className="-my-0.5 -mr-0.5 bg-blue-500 text-sm text-white font-semibold px-5 rounded-r-md hover:bg-blue-600 duration-200 disabled:bg-opacity-70"
                onClick={handleSubmit}
                disabled={disabled}
            >
                Add
            </button>
        </form>
    );
};

export default TodoForm;
