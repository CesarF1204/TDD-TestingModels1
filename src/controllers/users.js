const config = require('../config');
const bcrypt = require("bcrypt");
const users = require('../models/User');

class Users {
    /*	DOCU: This function is triggered in default to render the homepage 
	Owner: Cesar Francisco
	*/
    index(req, res) {
        res.render("users/index", {isLogin: req.session.islogin, fullName: req.session.fullname});
    }
    /*	DOCU: This function is responsible for rendering/showing the register form
	Owner: Cesar Francisco
	*/
    register_form(req, res) {
        res.render("users/register", {errorValidEmail: req.session.error_email_valid, errorRequired: req.session.error_required, errorConfirmPassword: req.session.error_confirm_password, successRegistered: req.session.registered_success});
        req.session.destroy();
    }
    /*	DOCU: This function is responsible for handling the validation and registration/adding of a user to the database
	Owner: Cesar Francisco
	*/
    async register_process(req, res) {
        try{
            let getUser = await users.get_user_by_email(req.body.email);
            //password hashing
            let salt = await bcrypt.genSalt(10);
            let user_password = await bcrypt.hash(req.body.password, salt);
            let confirmPassword = await bcrypt.compare(req.body.confirm_password, user_password);
            
            if(getUser[0].email_count > 0) {
                console.log('email used, cant register');
                req.session.error_email_valid = 'Email has been used, please try again.';
            } else if(req.body.email == '') {
                req.session.error_required = 'Please fill up the form.'
            } else if(!confirmPassword){
                req.session.error_confirm_password = 'Password mismatch. Please try again';
            } else {
                req.body.password = user_password;
                req.session.registered_success = 'Registered Successfully!';
                await users.register_user(req.body);
            }
            res.redirect("/register");
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible for rendering/showing the signin form
	Owner: Cesar Francisco
	*/
    signin_form(req, res) {
        res.render("users/signin", {signinError: req.session.signin_error});
        req.session.destroy();
    }
    /*	DOCU: This function is responsible to validate and sign-in a user that is registered from the database
	Owner: Cesar Francisco
	*/
    async signin_process(req, res){
        try{
            let user = await users.signin_user(req.body);
            let validatePassword = await bcrypt.compare(req.body.password, user[0].password);
            if(user.length == 0  || user == '' || !validatePassword){
                req.session.signin_error = 'User Not Found. Please try again.';
                res.redirect('/signin');
                console.log(req.session);
            } else {
                req.session.islogin = true;
                req.session.user_id = user[0].id;
                req.session.fullname = user[0].first_name +' '+ user[0].last_name;
                req.session.userlevel = user[0].user_level_id;
                console.log("Sessions:", req.session);
                res.redirect("/");
            }
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible for loggin-out a current user
	Owner: Cesar Francisco
	*/
    logout(req, res){
        req.session.destroy();
        res.redirect('/');
    }
    /*	DOCU: This function is responsible for rendering all users from the database
	Owner: Cesar Francisco
	*/
    async dashboard(req, res){
        try{
            if(req.session.islogin == true){
                let get_all_users = await users.get_all_users();
                res.render("users/dashboard", {isLogin: req.session.islogin, userLevel: req.session.userlevel, getAllUser: get_all_users, fullName: req.session.fullname, errorComment: req.session.error_comment, successComment: req.session.success_comment, deleteUser: req.session.delete_user});
            } else {
                res.redirect('/');
            }
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible for showing the details of current user for editing/updating
	Owner: Cesar Francisco
	*/
    async profile(req, res){
        try{
            if(req.session.islogin == true){
                let id = req.session.user_id;
                let get_user = await users.get_user_by_id(id);
                res.render("users/profile", {isLogin: req.session.islogin, getUser: get_user, fullName: req.session.fullname});
            } else {
                res.redirect('/');
            }
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible to validate and update the current user
	Owner: Cesar Francisco
	*/
    async update(req, res){
        try{
            let id = req.session.user_id;
            await users.update_user(req.body, id);
            res.redirect("/users/edit");
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible to validate and update the password of the current user
	Owner: Cesar Francisco
	*/
    async update_password(req, res){
        try{
            let id = req.session.user_id;
            await users.update_user_password(req.body, id);
            res.redirect("/users/edit");
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible to validate and update the description of the current user
	Owner: Cesar Francisco
	*/
    async update_description(req, res){
        try{
            let id = req.session.user_id;
            await users.update_user_description(req.body, id);
            res.redirect("/users/edit");
        } catch(err) {
            console.log("Error: ", err);
        }
    }
}
module.exports = new Users;