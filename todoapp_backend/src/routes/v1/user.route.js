const express = require("express");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");

const { userValidation, listValidation, todoValidation } = require("../../validations");
const { userController, listController, todoController } = require("../../controllers");

const router = express.Router();

router
    .route("/:userId/lists")
    .get(auth("self"), validate(listValidation.getLists), listController.getLists)
    .post(auth("self"), validate(listValidation.createList), listController.createList);

router
    .route("/:userId/lists/:listId")
    .patch(auth("self"), validate(listValidation.updateList), listController.updateList)
    .delete(auth("self"), validate(listValidation.deleteList), listController.deleteList);

router
    .route("/:userId/lists/:listId/todos")
    .get(auth("self"), validate(todoValidation.getTodos), todoController.getTodos)
    .post(auth("self"), validate(todoValidation.createTodo), todoController.createTodo);

router.route("/:userId/todos").get(auth("self"), validate(todoValidation.getTodos), todoController.getTodos);
router
    .route("/:userId/todos/:todoId")
    .patch(auth("self"), validate(todoValidation.updateTodo), todoController.updateTodo)
    .delete(auth("self"), validate(todoValidation.deleteTodo), todoController.deleteTodo);

router
    .route("/:userId/lists/:listId/todos/:todoId")
    .patch(auth("self"), validate(todoValidation.updateTodo), todoController.updateTodo)
    .delete(auth("self"), validate(todoValidation.deleteTodo), todoController.deleteTodo);

router.route("/:userId").get(auth("getUsers"), validate(userValidation.getUser), userController.getUser);

module.exports = router;
