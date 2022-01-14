const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");

const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");

const listController = require("../../controllers/list.controller");
const listValidation = require("../../validations/list.validation");

const router = express.Router();

router
    .route("/:userId/lists")
    .get(auth(), validate(listValidation.getLists), listController.getLists)
    .post(auth(), validate(listValidation.createList), listController.createList);
router
    .route("/:userId/lists/:listId")
    .patch(auth(), validate(listValidation.updateList), listController.updateList)
    .delete(auth(), validate(listValidation.deleteList), listController.deleteList);
router.route("/:userId").get(auth("getUsers"), validate(userValidation.getUser), userController.getUser);

module.exports = router;
