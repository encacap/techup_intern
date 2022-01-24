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
const confession_service_1 = __importDefault(require("../services/confession.service"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const createConfession = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { body: confessionBody } = req;
    const confession = yield confession_service_1.default.createConfession(confessionBody);
    res.send(confession);
}));
const getConfessions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confessions = yield confession_service_1.default.queryConfessions({});
    res.send(confessions);
}));
const updateConfession = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { confessionId } = req.params;
    const confession = yield confession_service_1.default.approveConfession(confessionId);
    res.send(confession);
}));
exports.default = {
    createConfession,
    getConfessions,
    updateConfession,
};
//# sourceMappingURL=confession.controller.js.map