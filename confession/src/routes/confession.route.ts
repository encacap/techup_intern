import express from "express";

import confessionController from "../controllers/confession.controller";
import { validate, auth } from "../middlewares";
import confessionValidation from "../validations/confession.validation";

const router = express.Router();

router
    .route("/")
    .post(validate(confessionValidation.createConfession), confessionController.createConfession)
    .get(confessionController.getConfessions);

router.route("/:confessionId").patch(auth("manageConfessions"), confessionController.updateConfession);

export default router;
