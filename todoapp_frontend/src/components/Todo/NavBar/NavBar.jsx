import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const TodoNavBar = () => {
    const { todos, lists } = useSelector((state) => state.todo);
    const validFilters = ["all", "unfinished", "finished"];
    let { filter = "all", listId } = useParams();

    const selectedList = lists.find((list) => String(list.id) === listId);

    let allTodos = 0;
    let unfinishedTodos = 0;
    let finishedTodos = 0;

    todos
        .filter((todo) => {
            if (listId === "220400") return true;
            return listId === todo.list;
        })
        .forEach((todo) => {
            if (todo.isCompleted) finishedTodos += 1;
            else unfinishedTodos += 1;
        });

    allTodos = finishedTodos + unfinishedTodos;

    if (!validFilters.includes(filter)) {
        filter = "all";
    }

    useEffect(() => {
        const filterTitles = {
            all: "All",
            unfinished: "Unfinished",
            finished: "Finished",
        };

        const title = `${filterTitles[filter]} - ${selectedList.name} - Khanh Nguyen`;

        window.document.title = title;
    }, [filter, selectedList]);

    return (
        <div className="flex items-center mt-10 px-6 border-2 border-b-0 border-gray-100 rounded-t-md font-semibold">
            <Link to={`/todos/${listId}/all`} className="mr-6">
                <div className={`px-3 py-4 ${filter === "all" && "text-blue-500"}`}>All ({allTodos})</div>
                <div className={`w-full h-1 ${filter === "all" && "bg-blue-500"} rounded-t-md`}></div>
            </Link>
            <Link to={`/todos/${listId}/unfinished`} className="mr-6">
                <div className={`px-3 py-4 ${filter === "unfinished" && "text-blue-500"}`}>
                    Unfinished ({unfinishedTodos})
                </div>
                <div className={`w-full h-1 ${filter === "unfinished" && "bg-blue-500"} rounded-t-md`}></div>
            </Link>
            <Link to={`/todos/${listId}/finished`} className="mr-6">
                <div className={`px-3 py-4 ${filter === "finished" && "text-blue-500"}`}>
                    Finished ({finishedTodos})
                </div>
                <div className={`w-full h-1 ${filter === "finished" && "bg-blue-500"} rounded-t-md`}></div>
            </Link>
        </div>
    );
};

export default TodoNavBar;
