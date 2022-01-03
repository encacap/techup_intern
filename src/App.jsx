import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
    return (
        <div className="w-screen h-screen flex">
            <div className="m-auto border-2 border-gray-100 p-10 rounded-md">
                <TodoForm />
                <TodoList />
            </div>
        </div>
    );
}

export default App;
