import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import request from "../utils/request";

const VerifyEmail = () => {
    const [isVerified, setIsVerified] = useState(false);
    const { user = {} } = useSelector((state) => state.user);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (user.isEmailVerified) {
            setIsVerified(true);
        }
    }, [user]);

    useEffect(() => {
        const sendVerificationEmail = async () => {
            try {
                await request.post("auth/send-verification-email", {
                    callback: `${window.location.origin}/accounts/verify-email`,
                });
            } catch (error) {}
        };

        const verifyEmail = async (token) => {
            try {
                await request.post("auth/verify-email", {
                    token,
                });
                setIsVerified(true);
            } catch (error) {
                console.log(error);
            }
        };

        if (user.isEmailVerified === false && !searchParams.get("token")) {
            sendVerificationEmail();
        } else if (searchParams.get("token")) {
            verifyEmail(searchParams.get("token"));
        }
    }, [user, searchParams]);

    return (
        <div className="flex w-full h-screen">
            <div className="w-96 m-auto border-2 border-gray-100 rounded-md p-10">
                <div className="mb-6 font-semibold">Verify your email</div>
                <div className="w-20 h-1 mb-5 rounded-md bg-gray-100"></div>
                {isVerified ? (
                    <div>
                        <div>Congratulations! Your email has been verified.</div>
                        <Link
                            to="/"
                            className="flex items-center justify-center mt-6 px-4 py-3 rounded-md border-blue-500 bg-blue-500 hover:bg-blue-600 cursor-pointer duration-100 text-white text-sm font-semibold"
                        >
                            Continue
                        </Link>
                    </div>
                ) : (
                    <div>
                        An email has been sent to your email address. Please click the link in the email to verify your
                        email address.
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;
