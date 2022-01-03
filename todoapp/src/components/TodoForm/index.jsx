import { useRef } from "react";
import { useStore } from "../../store/";
import { actions } from "../../store";

const TodoForm = () => {
    const [{ todoInput, isInputFocused }, dispatch] = useStore();

    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            actions.addTodo({
                id: Date.now(),
                job: todoInput,
                isDone: false,
            })
        );
        dispatch(actions.setTodoInput(""));

        inputRef.current.focus();
    };

    return (
        <form
            className={`border-2 ${isInputFocused ? "border-blue-500" : "border-gray-100"} rounded-md flex`}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                placeholder="What do you want?"
                className="w-96 px-6 py-4 rounded-l-md outline-none"
                value={todoInput}
                onInput={(e) => dispatch(actions.setTodoInput(e.target.value))}
                onFocus={() => dispatch(actions.focusTodoInput(true))}
                onBlur={() => dispatch(actions.focusTodoInput(false))}
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
