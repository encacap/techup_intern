import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import encacapLogo from "../assets/images/logo.svg";
import Input from "../components/Common/Form/Input";
import request from "../utils/request";

const Login = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isEmailSended, setIsEmailSended] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        window.document.title = "Reset your password - Khanh Nguyen";
    }, []);

    const sendResetPasswordEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await request.post("auth/forgot-password", {
                email,
                callback: window.location.origin + "/accounts/forgot-password",
            });
            setIsEmailSended(true);
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await request.post("auth/reset-password", {
                token,
                password: newPassword,
                confirmPassword,
            });
            setIsSuccess(true);
        } catch (error) {
            setError(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {!token ? (
                <div className="flex w-screen h-screen">
                    {!isEmailSended ? (
                        <form
                            action=""
                            className="m-auto rounded-md border-2 border-gray-100 px-10 py-12"
                            style={{ width: 480 }}
                            onSubmit={sendResetPasswordEmail}
                        >
                            <div>
                                <div>
                                    <img src={encacapLogo} alt="Khanh Nguyen - Encacap" className="w-16" />
                                </div>
                                <div className="font-semibold text-xl pt-7 pb-8">Reset your password</div>
                                <div>
                                    Please enter your email address and we will send you a link to reset your password.
                                </div>
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
                            </div>
                            <div className="flex items-center mt-5">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 rounded-md px-6 py-3 text-white text-sm font-semibold hover:bg-blue-600"
                                    disabled={isLoading}
                                >
                                    Reset your password
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div
                            className="m-auto rounded-md border-2 border-green-500 px-10 py-12 bg-green-100 text-green-500 font-semibold"
                            style={{ width: 480 }}
                        >
                            An email has been send to <strong>{email}</strong>. Please following the link in email to
                            reset your password.
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex w-screen h-screen">
                    {!isSuccess ? (
                        <form
                            action=""
                            className="m-auto rounded-md border-2 border-gray-100 px-10 py-12"
                            style={{ width: 480 }}
                            onSubmit={resetPassword}
                        >
                            <div>
                                <div>
                                    <img src={encacapLogo} alt="Khanh Nguyen - Encacap" className="w-16" />
                                </div>
                                <div className="font-semibold text-xl pt-7 pb-8">Enter you new passwords</div>
                                <div className="w-16 h-1 rounded-md bg-gray-100"></div>
                            </div>
                            <div className="mt-10">
                                {error && (
                                    <div className="mb-5 bg-red-200 px-6 py-4 border-2 border-red-500 rounded-md text-red-500 font-semibold">
                                        {error}
                                    </div>
                                )}
                                <Input
                                    label="New password"
                                    name="newPassword"
                                    type="password"
                                    placeholder="Ex: •••••••••••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />

                                <Input
                                    label="Confirm new password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Ex: •••••••••••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-5"
                                />
                            </div>
                            <div className="flex items-center mt-5">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 rounded-md px-6 py-3 text-white text-sm font-semibold hover:bg-blue-600"
                                    disabled={isLoading}
                                >
                                    Reset your password
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="m-auto rounded-md border-2 border-gray-100 px-10 py-12" style={{ width: 480 }}>
                            <div className="border-2 bg-green-100 border-green-500 rounded-md px-6 py-3 font-semibold text-green-500">
                                Success! Your password has been changed. You can login with new password now.
                            </div>
                            <Link
                                to="/accounts/login"
                                className="block bg-blue-500 rounded-md px-6 py-3 text-white text-sm font-semibold hover:bg-blue-600 text-center mt-5"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Login;
