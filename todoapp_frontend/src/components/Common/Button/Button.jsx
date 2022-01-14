const Button = ({ className, disabled = false, children, onClick }) => {
    return (
        <button
            className={`flex items-center justify-center mt-7 border-2 border-blue-500 rounded-md bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 transition-colors duration-200 cursor-pointer ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
