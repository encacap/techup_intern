import express, { RequestHandler } from "express";
import configs from "../configs/general";
import authRoute from "./auth.route";
import confessionRoute from "./confession.route";

const router = express.Router();

interface Routes {
    path: string;
    route: RequestHandler;
}

const defaultRoutes: Routes[] = [
    {
        path: "/confessions",
        route: confessionRoute,
    },
    {
        path: "/auth",
        route: authRoute,
    },
];

const devRoutes: Routes[] = [];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

if (configs.env === "development") {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

export default router;
