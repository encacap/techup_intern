import React from "react";
import { Link } from "react-router-dom";

const Button = ({ type = "button", colorType = "primary", className, disabled = false, to, children, onClick }) => {
    let buttonClassName = `flex items-center justify-center border-2 rounded-md px-6 py-3 text-sm font-semibold transition-colors duration-200 cursor-pointer disabled:bg-opacity-70 disabled:cursor-not-allowed`;

    if (colorType === "primary") {
        buttonClassName += ` border-blue-500 text-white bg-blue-500 hover:bg-blue-600`;
    } else if (colorType === "secondary") {
        buttonClassName += ` border-gray-200 text-black bg-gray-200 hover:bg-gray-300`;
    }

    buttonClassName += ` ${className}`;

    return (
        <>
            {to ? (
                <Link to={to} className={buttonClassName}>
                    {children}
                </Link>
            ) : (
                <button type={type} className={buttonClassName} onClick={onClick} disabled={disabled}>
                    {children}
                </button>
            )}
        </>
    );
};

export default Button;
