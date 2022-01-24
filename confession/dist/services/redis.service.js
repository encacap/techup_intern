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
exports.setConfession = exports.setConfessions = exports.getConfessions = exports.getData = void 0;
const redis_1 = require("redis");
const logger_1 = __importDefault(require("../configs/logger"));
const redisClient = (0, redis_1.createClient)();
redisClient
    .connect()
    .then(() => {
    logger_1.default.info("Connected to Redis");
})
    .catch((error) => {
    logger_1.default.error("Failed to connect to Redis", error);
});
const getData = (key) => __awaiter(void 0, void 0, void 0, function* () {
    return redisClient.get(key);
});
exports.getData = getData;
const getConfessions = () => __awaiter(void 0, void 0, void 0, function* () {
    const confessions = yield redisClient.get("confessions");
    return confessions;
});
exports.getConfessions = getConfessions;
const setConfessions = (confessions) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.set("confessions", JSON.stringify(confessions));
});
exports.setConfessions = setConfessions;
const setConfession = (confession) => __awaiter(void 0, void 0, void 0, function* () {
    const confessions = yield getConfessions();
    if (confessions) {
        const parsedConfessions = JSON.parse(confessions);
        parsedConfessions.push(confession);
        yield setConfessions(parsedConfessions);
    }
});
exports.setConfession = setConfession;
//# sourceMappingURL=redis.service.js.map