"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const services_1 = require("../services");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { body } = req;
    const user = yield services_1.userService.createUser(body);
    const tokens = yield services_1.tokenService.generateAuthToken(user);
    res.status(http_status_1.default.CREATED).send({
        user,
        tokens,
    });
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield services_1.userService.loginWithEmailAndPassword(email, password);
    const tokens = yield services_1.tokenService.generateAuthToken(user);
    res.status(http_status_1.default.OK).send({
        user,
        tokens,
    });
}));
exports.default = {
    register,
    login,
};
//# sourceMappingURL=auth.controller.js.map