const config = require('../config');
const users = require('../models/User');
const admins = require('../models/Admin');

class Admins {
    /*	DOCU: This function is to render the new user form
	Owner: Cesar Francisco
	*/
    new_user_form(req, res){
        if(req.session.islogin === true && req.session.userlevel === 9){
            res.render("admins/new_user", {isLogin: req.session.islogin, fullName: req.session.fullname});
        } else {
            res.redirect('/');
        }
    }
    /*	DOCU: This function is responsible to validate and add a user to the database
	Owner: Cesar Francisco
	*/
    async new_user_process(req, res){
        try {
            await users.register_user(req.body);
            res.redirect("/users/new");
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible to render a form and show the values of a user from database for editing
	Owner: Cesar Francisco
	*/
    async admin_user_edit_form(req, res){
        try {
            if(req.session.islogin === true && req.session.userlevel === 9){
                let get_user = await users.get_user_by_id(req.params.id);
                res.render("admins/user_edit", {isLogin: req.session.islogin, getUser: get_user, fullName: req.session.fullname});
            } else {
                res.redirect('/');
            }
        } catch(err) {
            console.log("Error: ", err);
        } 
    }
    /*	DOCU: This function is responsible to validate and edit/update a user to the database
	Owner: Cesar Francisco
	*/
    async admin_user_edit(req, res){
        try {
            let id = req.params.id;
            await admins.user_edit(req.body, id);
            res.redirect("/dashboard");
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible to validate and edit/update the password of a user to the database
	Owner: Cesar Francisco
	*/
    async update_user_password(req, res){
        try{
            let id = req.params.id;
            await users.update_user_password(req.body, id);
            res.redirect("/dashboard");
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible for viewing the details and confirming a user for deletion
	Owner: Cesar Francisco
	*/
    async delete_confirmation(req, res){
        try {
            if(req.session.islogin === true && req.session.userlevel === 9){
                let get_user = await users.get_user_by_id(req.params.id);
                res.render("admins/delete_user", {isLogin: req.session.islogin, getUser: get_user, fullName: req.session.fullname});
            } else {
                res.redirect('/');
            }
        } catch(err){
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible for handling the success deletion of a user to the database
	Owner: Cesar Francisco
	*/
    async delete_user(req, res){
        try {
            let id = req.params.id;
            await admins.user_delete(id);
            req.session.delete_user = "User deleted!";
            res.redirect("/dashboard");
        } catch(err){
            console.log("Error: ", err);
        }
    }
}
module.exports = new Admins;