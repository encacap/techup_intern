"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const general_1 = __importDefault(require("../configs/general"));
const auth_route_1 = __importDefault(require("./auth.route"));
const confession_route_1 = __importDefault(require("./confession.route"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: "/confessions",
        route: confession_route_1.default,
    },
    {
        path: "/auth",
        route: auth_route_1.default,
    },
];
const devRoutes = [];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
if (general_1.default.env === "development") {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}
exports.default = router;
//# sourceMappingURL=index.js.map