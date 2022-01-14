const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");

const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");

const todoController = require("../../controllers/todo.controller");
const todoValidation = require("../../validations/todo.validation");

const router = express.Router();

router
    .route("/:userId/lists")
    .get(auth(), validate(todoValidation.getLists), todoController.getLists)
    .post(auth(), validate(todoValidation.createList), todoController.createList);
router.route("/:userId/lists/:listId").patch(auth(), validate(todoValidation.updateList), todoController.updateList);
router.route("/:userId").get(auth("getUsers"), validate(userValidation.getUser), userController.getUser);

module.exports = router;
