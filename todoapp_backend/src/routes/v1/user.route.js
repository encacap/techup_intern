const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");

const { userValidation, listValidation, todoValidation } = require("../../validations");
const { userController, listController, todoController } = require("../../controllers");

const router = express.Router();

router
    .route("/:userId/lists")
    .get(auth(), validate(listValidation.getLists), listController.getLists)
    .post(auth(), validate(listValidation.createList), listController.createList);

router
    .route("/:userId/lists/:listId")
    .patch(auth(), validate(listValidation.updateList), listController.updateList)
    .delete(auth(), validate(listValidation.deleteList), listController.deleteList);

router
    .route("/:userId/lists/:listId/todos")
    .get(auth(), validate(todoValidation.getTodos), todoController.getTodos)
    .post(auth(), validate(todoValidation.createTodo), todoController.createTodo);

router
    .route("/:userId/lists/:listId/todos/:todoId")
    .patch(auth(), validate(todoValidation.updateTodo), todoController.updateTodo)
    .delete(auth(), validate(todoValidation.deleteTodo), todoController.deleteTodo);

router.route("/:userId").get(auth("getUsers"), validate(userValidation.getUser), userController.getUser);

module.exports = router;
