import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as userActions from "../actions/user";
import encacapLogo from "../assets/images/logo.svg";

import Input from "../components/Common/Form/Input";
import Button from "../components/Common/Button";

import { guestRequest as request } from "../utils/request";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userActions.setUser(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.document.title = "Login - Khanh Nguyen";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginCredentials = {
            email,
            password,
        };

        try {
            const { data } = await request.post("auth/login", loginCredentials);
            dispatch(userActions.setUser(data.user));
            dispatch(userActions.setAccessToken(data.tokens.access));
            dispatch(userActions.setRefreshToken(data.tokens.refresh));
            navigate("/", { replace: true });
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="flex w-screen h-screen">
            <form
                action=""
                className="m-auto rounded-md border-2 border-gray-100 px-10 py-12"
                style={{ width: 480 }}
                onSubmit={handleSubmit}
            >
                <div>
                    <div>
                        <img src={encacapLogo} alt="Khanh Nguyen - Encacap" className="w-16" />
                    </div>
                    <div className="font-semibold text-xl pt-7 pb-8">Login to your account</div>
                    <div className="w-16 h-1 rounded-md bg-gray-100"></div>
                </div>
                <div className="mt-10">
                    {error && (
                        <div className="mb-5 bg-red-200 px-6 py-4 border-2 border-red-500 rounded-md text-red-500 font-semibold">
                            {error}
                        </div>
                    )}
                    <Input
                        label="Email"
                        name="email"
                        placeholder="Ex: your.email@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        className="mt-5"
                        placeholder="Ex: •••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                        <Link to="/accounts/forgot-password" className="font-normal text-blue-500">
                            Forgot password?
                        </Link>
                    </Input>
                </div>
                <div className="flex items-center mt-5">
                    <Button to="/accounts/register" className="mr-5" colorType="secondary">
                        Register
                    </Button>
                    <Button type="submit" className="flex-1 font-semibold text-sm">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
