const express = require("express");
const router = express.Router();
const UserController = require("./controllers/users");
const AdminController = require("./controllers/admins");
const MessageController = require("./controllers/messages");

//index
router.get("/", UserController.index);

//users panel
//register
router.get("/register", UserController.register_form);
router.post("/register_process", UserController.register_process);
// signin
router.get("/signin", UserController.signin_form);
router.post("/signin_process", UserController.signin_process);
//logout
router.get("/logout", UserController.logout);
//dashboard
router.get("/dashboard", UserController.dashboard);
//profile
router.get("/users/edit", UserController.profile);
router.post("/users/update", UserController.update);
router.post("/users/update_password", UserController.update_password);
router.post("/users/update_description", UserController.update_description);
//show messages
router.get("/users/show/:id", MessageController.show_user_messages);
router.post("/users/message", MessageController.message_process);
router.post("/users/comment", MessageController.comment_process);

//admin panel
//add new user
router.get("/users/new", AdminController.new_user_form);
router.post("/admins/new_user_process", AdminController.new_user_process);
//edit user
router.get("/users/edit/:id", AdminController.admin_user_edit_form);
router.post("/admins/user_update/:id", AdminController.admin_user_edit);
router.post("/admins/update_password/:id", AdminController.update_user_password);
//delete user
router.get("/admins/delete_confirmation/:id", AdminController.delete_confirmation);
router.post("/admins/delete_user/:id", AdminController.delete_user)

module.exports = router;