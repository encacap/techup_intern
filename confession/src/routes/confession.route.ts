import express from "express";

import confessionController from "../controllers/confession.controller";
import validate from "../middlewares/validate";
import confessionValidation from "../validations/confession.validation";

const router = express.Router();

router
    .route("/")
    .post(validate(confessionValidation.createConfession), confessionController.createConfession)
    .get(confessionController.getConfessions);

export default router;
