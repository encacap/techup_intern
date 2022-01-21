"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const confession_controller_1 = __importDefault(require("../controllers/confession.controller"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const confession_validation_1 = __importDefault(require("../validations/confession.validation"));
const router = express_1.default.Router();
router
    .route("/")
    .post((0, validate_1.default)(confession_validation_1.default.createConfession), confession_controller_1.default.createConfession)
    .get(confession_controller_1.default.getConfessions);
exports.default = router;
//# sourceMappingURL=confession.route.js.map