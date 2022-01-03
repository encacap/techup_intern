const lineClamp = require("@tailwindcss/line-clamp");

module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            colors: {
                background: {
                    dark: "#26335D",
                    secondary: "#B6D7FF",
                },
                primary: "#FF6551",
                secondary: "#FFC652",
                text: {
                    light: "#737373",
                    muted: "#BDBDBD",
                    disabled: "#8EC2F2",
                },
                danger: "#E74040",
                alert: "#E77C40",
            },
            fontFamily: {
                montserrat: ["Montserrat"],
            },
        },
    },
    plugins: [lineClamp],
};
