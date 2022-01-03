import { Routes, Route } from "react-router-dom";
import TodoForm from "./components/TodoForm";
import TodoNavBar from "./components/TodoNavBar";
import TodoList from "./components/TodoList";

function App() {
    return (
        <div className="w-screen h-screen flex">
            <div className="m-auto border-2 border-gray-100 p-10 rounded-md">
                <TodoForm />
                <TodoNavBar />
                <Routes>
                    <Route path="/" element={<TodoList />} />
                    <Route path="/unfinished" element={<TodoList filter="unfinished" />} />
                    <Route path="/finished" element={<TodoList filter="finished" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
