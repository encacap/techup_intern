import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import TodoBody from "../../components/Todo/Body";
import TodoForm from "../../components/Todo/Form";
import TodoSidebar from "../../components/Todo/Sidebar";

const Todo = () => {
    const params = useParams();
    const { user } = useSelector((state) => state.user);
    const { lists, isLoadedList } = useSelector((state) => state.todo);

    const selectedList = lists.find((list) => list.id === params.listId);

    return (
        <>
            {user?.id ? (
                <div className="w-screen h-screen flex">
                    <div className="flex w-full h-full">
                        <TodoSidebar list={params.listId} />
                        <div className="p-10 w-full">
                            <TodoForm disabled={selectedList?.isDefault === true} />
                            <Routes>
                                <Route
                                    path=":list/:filter/*"
                                    element={
                                        isLoadedList ? (
                                            <TodoBody />
                                        ) : (
                                            <div className="mt-10 border-2 border-gray-100 rounded-md px-6 py-10">
                                                Loading...
                                            </div>
                                        )
                                    }
                                />
                            </Routes>
                        </div>
                    </div>
                </div>
            ) : (
                <Navigate to="/accounts/login" />
            )}
        </>
    );
};

export default Todo;
