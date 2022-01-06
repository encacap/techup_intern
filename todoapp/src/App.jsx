import { Route, Routes } from "react-router-dom";
import TodoBody from "./components/TodoBody";
import TodoForm from "./components/TodoForm";

function App() {
    return (
        <div className="w-screen h-screen flex">
            <div className="flex m-auto border-2 border-gray-100 rounded-md">
                {/* <div className="border-r-2 border-gray-100">
                    <div>Tất cả</div>
                </div> */}
                <div className="p-10">
                    <TodoForm />
                    <Routes>
                        <Route path="/" element={<TodoBody />} />
                        <Route path="todos" element={<TodoBody />}>
                            <Route path=":filter" element={<TodoBody />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
