"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const confession_controller_1 = __importDefault(require("../controllers/confession.controller"));
const middlewares_1 = require("../middlewares");
const confession_validation_1 = __importDefault(require("../validations/confession.validation"));
const router = express_1.default.Router();
router
    .route("/")
    .post((0, middlewares_1.validate)(confession_validation_1.default.createConfession), confession_controller_1.default.createConfession)
    .get(confession_controller_1.default.getConfessions);
router.route("/:confessionId").patch((0, middlewares_1.auth)("manageConfessions"), confession_controller_1.default.updateConfession);
exports.default = router;
//# sourceMappingURL=confession.route.js.map