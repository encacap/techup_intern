import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as userActions from "../actions/user";
import encacapLogo from "../assets/images/logo.svg";
import Button from "../components/Common/Button";
import Input from "../components/Common/Form/Input";
import { guestRequest as request } from "../utils/request";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.document.title = "Register - Khanh Nguyen";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await request.post("auth/register", {
                email,
                name,
                password,
            });
            dispatch(userActions.setUser(data.user));
            dispatch(userActions.setAccessToken(data.tokens.access));
            dispatch(userActions.setRefreshToken(data.tokens.refresh));
            navigate("/", { replace: true });
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="flex w-screen h-screen overflow-x-hidden p-10">
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
                    <div className="font-semibold text-xl pt-7 pb-8">Register account</div>
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
                        label="Your name"
                        name="name"
                        placeholder="Ex: Khanh Nguyen"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={"mt-5"}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        className="mt-5"
                        placeholder="Ex: •••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center mt-5">
                    <Button to="/accounts/login" className="mr-5" colorType="secondary">
                        Login
                    </Button>
                    <Button type="submit" className="flex-1">
                        Register
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Login;
