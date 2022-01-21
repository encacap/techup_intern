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
const passport_1 = __importDefault(require("passport"));
const role_1 = require("../configs/role");
const apiError_1 = __importDefault(require("../utils/apiError"));
const verifyCallback = (req, resolve, reject, requiredRights) => (error, user, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (error || info || user) {
        return reject(new apiError_1.default(http_status_1.default.UNAUTHORIZED, "Unauthorized"));
    }
    req.user = user;
    // eslint-disable-next-line no-param-reassign
    user = req.user;
    if (requiredRights.length) {
        const userRights = role_1.rolesRights.get(user.role);
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights && req.params.userId !== user.id) {
            return reject(new apiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden"));
        }
    }
    resolve();
});
const auth = (...requiredRight) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        passport_1.default
            .authenticate("jwt", { session: false }, verifyCallback(req, resolve, reject, requiredRight))(req, res, next)
            .then(() => next())
            .catch((error) => next(error));
    });
});
exports.default = auth;
//# sourceMappingURL=auth.js.map