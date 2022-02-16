import compression from "compression";
import cors from "cors";
import express, { RequestHandler } from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import httpStatus from "http-status";
import passport from "passport";

import configs from "./configs/general";
import morgan from "./configs/morgan";
import jwtStrategy from "./configs/passport";
import { errorConverter, errorHandler } from "./middlewares/error";
import routes from "./routes";
import ApiError from "./utils/apiError";

const app = express();

if (configs.env !== "test") {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use(compression());

app.use(cors());

// JWT Authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Routes
app.use("/", routes as RequestHandler);

// 404
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle error
app.use(errorHandler);

export default app;
