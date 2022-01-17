const configs = require("../config/config");

module.exports = {
    servers: [
        {
            url: `http://localhost:${configs.port}/v1`,
            description: "Local",
        },
    ],
};
