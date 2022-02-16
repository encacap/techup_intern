import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";

const Input = ({ label, type, name, placeholder, value, onChange, className, children }) => {
    const [isViewPlain, setIsViewPlain] = useState(false);

    return (
        <div
            className={`${className} group border-2 border-gray-100 rounded-md focus-within:border-blue-500 hover:border-blue-500`}
        >
            <label className="relative block px-6 pb-4 pt-5 cursor-text">
                {label && (
                    <div className="flex justify-between items-center font-semibold text-sm text-gray-400 group-focus-within:text-blue-500">
                        {label}:{children}
                    </div>
                )}
                <input
                    type={isViewPlain ? "text" : type}
                    name={name}
                    placeholder={placeholder || ""}
                    value={value}
                    onChange={onChange}
                    className="w-full mt-1 py-1 outline-none text-black"
                />
                {type === "password" && isViewPlain && (
                    <div className="absolute top-12 right-6 cursor-pointer" onClick={() => setIsViewPlain(false)}>
                        <Eye className="w-5" />
                    </div>
                )}
                {type === "password" && !isViewPlain && (
                    <div className="absolute top-12 right-6 cursor-pointer" onClick={() => setIsViewPlain(true)}>
                        <EyeSlash className="w-5 text-gray-400" />
                    </div>
                )}
            </label>
        </div>
    );
};

export default Input;
