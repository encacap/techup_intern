import { useSelector } from "react-redux";

const RequireAuth = ({ children }) => {
    const { user, accessToken } = useSelector((state) => state.user);

    return <>{user && accessToken ? children : <h1>Login...</h1>}</>;
};

export default RequireAuth;
