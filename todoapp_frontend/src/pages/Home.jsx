import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import TodoBody from "../components/Todo/Body";
import TodoForm from "../components/Todo/Form";
import TodoSidebar from "../components/Todo/Sidebar";
import request from "../utils/request";

const Home = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { user = {}, accessToken } = useSelector((state) => state.user);

    useEffect(() => {
        if (!user) {
            navigate("/accounts/login", { replace: true });
        }
    }, [user, navigate]);

    useEffect(() => {
        const getUserInformation = async () => {
            try {
                const { isEmailVerified } = await request.get(`users/${user.id}`);
                if (isEmailVerified === false) {
                    navigate("/accounts/verify-email");
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (!accessToken || !user) {
            navigate("/accounts/login", { replace: true });
        } else {
            getUserInformation();
        }
    }, [user, accessToken, navigate]);

    return (
        <>
            {accessToken ? (
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
            ) : (
                <Navigate to="/accounts/login" />
            )}
        </>
    );
};

export default Home;
