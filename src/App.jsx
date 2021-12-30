import { useState, useRef, useEffect } from "react";

function App() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [inputFocus, setInputFocus] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        console.log(todos);
    }, [todos]);

    const handleSubmit = (e) => {
        setTodos([...todos, { job: todo, isDone: false }]);
        setTodo("");

        inputRef.current.focus();
    };

    const handleRemove = (index) => {
        setTodos(todos.filter((todo, i) => i !== index));
    };

    const handleDone = (index) => {
        const newTodos = [...todos];
        newTodos[index].isDone = !newTodos[index].isDone;
        setTodos(newTodos);
    };

    return (
        <div className="w-screen h-screen flex">
            <div className="m-auto border-2 border-gray-100 p-10 rounded-md">
                <div className={`border-2 ${inputFocus ? "border-blue-500" : "border-gray-100"} rounded-md flex`}>
                    <input
                        type="text"
                        placeholder="What do you want?"
                        className="w-96 px-6 py-4 rounded-l-md outline-none"
                        value={todo}
                        onInput={(e) => setTodo(e.target.value)}
                        onFocus={() => setInputFocus(true)}
                        onBlur={() => setInputFocus(false)}
                        ref={inputRef}
                    />
                    <button
                        className="-my-0.5 -mr-0.5 bg-blue-500 text-sm text-white font-semibold px-5 rounded-r-md hover:bg-blue-600 duration-200"
                        onClick={handleSubmit}
                    >
                        Add
                    </button>
                </div>
                <div className="mt-10">
                    {todos.length === 0 ? (
                        <div className="px-4 py-10 rounded-md bg-gray-100 text-gray-400 text-center">
                            Nothing here =((
                        </div>
                    ) : (
                        <ul className="list-none border-2 border-gray-100 rounded-md px-6">
                            {todos.map((todo, index) => (
                                <li
                                    key={index}
                                    className={`flex justify-between py-3 ${
                                        index !== todos.length - 1 && "border-b-2 border-gray-100"
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="complete"
                                            className="mr-3 mt-0.5"
                                            onChange={() => handleDone(index)}
                                            checked={todo.isDone}
                                        />
                                        <span className={todo.isDone ? "line-through text-gray-400" : ""}>
                                            {todo.job}
                                        </span>
                                    </div>
                                    <div
                                        className="flex items-center pb-px text-xs bg-gray-100 px-2 rounded-md text-gray-400 cursor-pointer hover:bg-slate-200 duration-200"
                                        onClick={() => handleRemove(index)}
                                    >
                                        Remove
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
