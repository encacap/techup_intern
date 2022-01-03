import { Link } from "react-router-dom";
import { useStore } from "../../store/";
import { actions } from "../../store";

const TodoNavBar = () => {
    const [{ todosFilter, todos }, dispatch] = useStore();
    const allTodos = todos.length;
    let unfinishedTodos = 0,
        finishedTodos = 0;
    todos.forEach((todo) => {
        if (!todo.isDone) unfinishedTodos++;
        else finishedTodos++;
    });
    return (
        <div className="flex items-center mt-10 px-6 border-2 border-b-0 border-gray-100 rounded-t-md font-semibold">
            <Link to="/" className="mr-6" onClick={() => dispatch(actions.setTodosFilter("all"))}>
                <div className={`px-3 py-4 ${todosFilter === "all" && "text-blue-500"}`}>All ({allTodos})</div>
                <div className={`w-full h-1 ${todosFilter === "all" && "bg-blue-500"} rounded-t-md`}></div>
            </Link>
            <Link to="/unfinished" className="mr-6" onClick={() => dispatch(actions.setTodosFilter("unfinished"))}>
                <div className={`px-3 py-4 ${todosFilter === "unfinished" && "text-blue-500"}`}>
                    Unfinished ({unfinishedTodos})
                </div>
                <div className={`w-full h-1 ${todosFilter === "unfinished" && "bg-blue-500"} rounded-t-md`}></div>
            </Link>
            <Link to="/finished" className="mr-6" onClick={() => dispatch(actions.setTodosFilter("finished"))}>
                <div className={`px-3 py-4 ${todosFilter === "finished" && "text-blue-500"}`}>
                    Finished ({finishedTodos})
                </div>
                <div className={`w-full h-1 ${todosFilter === "finished" && "bg-blue-500"} rounded-t-md`}></div>
            </Link>
        </div>
    );
};

export default TodoNavBar;
