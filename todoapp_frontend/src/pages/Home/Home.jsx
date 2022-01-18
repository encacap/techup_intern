import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate, Route, Routes } from "react-router-dom";
import Todo from "./Todo";

import * as todoActions from "../../actions/todo";

import { todoService, listService, userService } from "../../services";

const Home = () => {
    const { lists, isLoadedList } = useSelector((state) => state.todo);
    const { user, accessToken } = useSelector((state) => state.user);

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

        if (!accessToken || !user?.id) {
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

        if (!lists.filter((list) => !list.isDefault).length && user?.id) {
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

        if (user?.id) fetchTodos();
    }, [user, dispatch]);
    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to={`/todos/220400/all`} />} />
                <Route path="/todos/*" element={<Todo />}>
                    <Route path=":listId/*" element={<Todo />} />
                    <Route path="*" element={<Todo />} />
                </Route>
            </Routes>
        </>
    );
};

export default Home;
