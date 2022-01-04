import { Routes, Route } from "react-router-dom";
import TodoForm from "./components/TodoForm";
import TodoBody from "./components/TodoBody";

function App() {
    return (
        <div className="w-screen h-screen flex">
            <div className="m-auto border-2 border-gray-100 p-10 rounded-md">
                <TodoForm />
                <Routes>
                    <Route path="/" element={<TodoBody />} />
                    <Route path="todos" element={<TodoBody />}>
                        <Route path=":filter" element={<TodoBody />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
