"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const confession_model_1 = __importDefault(require("../models/confession.model"));
const redisService = __importStar(require("./redis.service"));
/**
 * Create a new confession
 * @param {ConfessionDocument} confessionBody
 * @returns {Promise<ConfessionDocument>}
 */
const createConfession = (confessionBody) => __awaiter(void 0, void 0, void 0, function* () {
    const newConfession = yield confession_model_1.default.create(confessionBody);
    yield redisService.setConfession(newConfession);
    return newConfession;
});
/**
 * Query for confession
 * @param {FilterQuery<object>} filters - MongoDB query filters
 * @returns {Promise<ConfessionDocument[]>}
 */
const queryConfessions = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    let confessions;
    let isCacheHit = false;
    const cachedConfessions = yield redisService.getConfessions();
    if (cachedConfessions) {
        confessions = JSON.parse(cachedConfessions);
        isCacheHit = true;
    }
    confessions = (yield confession_model_1.default.find(filters));
    yield redisService.setConfessions(confessions);
    return { results: confessions, totalResults: confessions.length, isCacheHit };
});
const getConfessionById = (confessionId, isThrowError = true) => __awaiter(void 0, void 0, void 0, function* () {
    const confession = (yield confession_model_1.default.findById(confessionId));
    if (!confession && isThrowError) {
        throw new Error("Confession not found");
    }
    return confession;
});
const approveConfession = (confessionId) => __awaiter(void 0, void 0, void 0, function* () {
    const confession = yield getConfessionById(confessionId);
    confession.isApproved = true;
    return confession.save();
});
exports.default = {
    createConfession,
    queryConfessions,
    approveConfession,
};
//# sourceMappingURL=confession.service.js.map