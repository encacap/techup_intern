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
const confession_model_1 = __importDefault(require("../models/confession.model"));
/**
 * Create a new confession
 * @param {ConfessionDocument} confessionBody
 * @returns {Promise<ConfessionDocument>}
 */
const createConfession = (confessionBody) => __awaiter(void 0, void 0, void 0, function* () {
    const newConfession = yield confession_model_1.default.create(confessionBody);
    return newConfession;
});
/**
 * Query for confession
 * @param {FilterQuery<object>} filters - MongoDB query filters
 * @returns {Promise<ConfessionDocument[]>}
 */
const queryConfessions = (filters) => __awaiter(void 0, void 0, void 0, function* () {
    const confessions = (yield confession_model_1.default.find(filters));
    return confessions;
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