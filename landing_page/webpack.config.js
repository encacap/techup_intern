const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: {
        home: ["/resources/js/home.js"],
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, "assets/js"),
    },
    devtool: "source-map",
};
