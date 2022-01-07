import { Route, Routes, useParams } from "react-router-dom";
import TodoBody from "../components/Todo/Body";
import TodoForm from "../components/Todo/Form";
import TodoSidebar from "../components/Todo/Sidebar";

const Home = () => {
    const params = useParams();
    return (
        <div className="w-screen h-screen flex">
            <div className="flex m-auto border-2 border-gray-100 rounded-md">
                <TodoSidebar list={params.listId} />
                <div className="p-10">
                    <TodoForm />
                    <Routes>
                        <Route path=":list/:filter/*" element={<TodoBody />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Home;
