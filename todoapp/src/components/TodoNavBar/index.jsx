import { Link, useParams } from "react-router-dom";
import { useStore } from "../../store/";

const TodoNavBar = () => {
    const [{ todos }] = useStore();
    const validFilters = ["all", "unfinished", "finished"];
    let { filter } = useParams();

    if (!validFilters.includes(filter)) {
        filter = "all";
    }

    const allTodos = todos.length;
    let unfinishedTodos = 0,
        finishedTodos = 0;
    todos.forEach((todo) => {
        if (!todo.isDone) unfinishedTodos++;
        else finishedTodos++;
    });
    return (
        <div className="flex items-center mt-10 px-6 border-2 border-b-0 border-gray-100 rounded-t-md font-semibold">
            <Link to="/todos/all" className="mr-6">
                <div className={`px-3 py-4 ${filter === "all" && "text-blue-500"}`}>All ({allTodos})</div>
                <div className={`w-full h-1 ${filter === "all" && "bg-blue-500"} rounded-t-md`}></div>
            </Link>
            <Link to="/todos/unfinished" className="mr-6">
                <div className={`px-3 py-4 ${filter === "unfinished" && "text-blue-500"}`}>
                    Unfinished ({unfinishedTodos})
                </div>
                <div className={`w-full h-1 ${filter === "unfinished" && "bg-blue-500"} rounded-t-md`}></div>
            </Link>
            <Link to="/todos/finished" className="mr-6">
                <div className={`px-3 py-4 ${filter === "finished" && "text-blue-500"}`}>
                    Finished ({finishedTodos})
                </div>
                <div className={`w-full h-1 ${filter === "finished" && "bg-blue-500"} rounded-t-md`}></div>
            </Link>
        </div>
    );
};

export default TodoNavBar;
