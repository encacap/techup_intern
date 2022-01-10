import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../../actions/todo";

const TodoForm = () => {
    const { newTodo, isNewInputFocused } = useSelector((state) => state.todo);
    const dispatch = useDispatch();

    const { listId } = useParams();

    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            actions.addNewTodo({
                id: Date.now(),
                job: newTodo,
                isDone: false,
                listId,
            })
        );
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
            className={`border-2 ${isNewInputFocused ? "border-blue-500" : "border-gray-100"} rounded-md flex`}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="What do you want?"
                className="w-96 px-6 py-4 rounded-l-md outline-none"
                value={newTodo}
                onInput={handleInput}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
            />
            <button
                className="-my-0.5 -mr-0.5 bg-blue-500 text-sm text-white font-semibold px-5 rounded-r-md hover:bg-blue-600 duration-200"
                onClick={handleSubmit}
            >
                Add
            </button>
        </form>
    );
};

export default TodoForm;
