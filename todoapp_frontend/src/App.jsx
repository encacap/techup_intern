import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";

import * as todoActions from "./actions/todo";

import { todoService, listService, userService } from "./services";

function App() {
    const { lists, isLoadedList, todos } = useSelector((state) => state.todo);
    const { user, accessToken } = useSelector((state) => state.user);
    const defaultListId = lists.find((list) => list.isDefault)?.id || lists[0].id;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/accounts/login", { replace: true });
        }
    }, [user, navigate]);

    useEffect(() => {
        const getUserInformation = async () => {
            try {
                const { isEmailVerified } = await userService.getUserById(user.id);
                if (isEmailVerified === false) {
                    navigate("/accounts/verify-email");
                }
            } catch (error) {
                console.log(error.response);
            }
        };

        if (!accessToken || Object.keys(user).length === 0) {
            navigate("/accounts/login", { replace: true });
        } else {
            getUserInformation();
        }
    }, [accessToken, user, navigate]);

    useEffect(() => {
        const getLists = async () => {
            try {
                const data = await listService.getLists(user.id);
                dispatch(todoActions.setLists(data.results));
                dispatch(todoActions.setLoadingListStatus(true));
            } catch (error) {
                console.log(error);
            }
        };

        if (!lists.filter((list) => !list.isDefault).length) {
            getLists();
        }
    }, [isLoadedList, lists, user, dispatch]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await todoService.getTodos(user.id);
                dispatch(todoActions.setTodos(data.results));
            } catch (error) {
                console.log(error);
            }
        };

        if (!todos.length) {
            fetchTodos();
        }
    }, [todos, user, dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={`/todos/${defaultListId}/all`} />} />
                <Route path="/accounts/*">
                    <Route path="login" element={<Login />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="verify-email" element={<VerifyEmail />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                </Route>
                <Route path="/todos/*" element={<Home />}>
                    <Route path=":listId/*" element={<Home />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
