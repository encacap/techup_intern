const basicInformation = require("./basicInformation");
const servers = require("./servers");
const tags = require("./tags");
const components = require("./components");

const authPaths = require("./auth/index");
const userPaths = require("./users/index");

module.exports = {
    ...basicInformation,
    ...servers,
    ...tags,
    ...components,
    ...authPaths,
    paths: {
        ...authPaths.paths,
        ...userPaths.paths,
    },
};
