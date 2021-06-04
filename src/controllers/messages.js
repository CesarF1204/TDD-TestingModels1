const config = require('../config');
const users = require('../models/User');
const messages = require('../models/Message');

class Messages {
    /*	DOCU: This function is responsible for showing and getting all messages and comments from any users from the database
	Owner: Cesar Francisco
	*/
    async show_user_messages(req, res){
        try {
            if(req.session.islogin === true){
                let get_user = await users.get_user_by_id(req.params.id);
                let get_message = await messages.get_all_messages();
                let get_comment = await messages.get_all_comments();
                res.render("users/show_messages", {getUser: get_user, getMessage: get_message, getComment: get_comment, isLogin: req.session.islogin, fullName: req.session.fullname, errorMessage: req.session.error_message, successMessage: req.session.success_message});
            } else {
                res.redirect('/');
            }
        } catch(err) {
            console.log(err);
        }
    }
    /*	DOCU: This function is responsible to validate and add a message to any user from the current user that is logged-in
	Owner: Cesar Francisco
	*/
    async message_process(req, res){
        try {
            if(req.body.message == ''){
                req.session.error_message = "Please enter a message."
            } else {
                let user_id = req.session.user_id;
                await messages.message_sent(req.body, user_id);
                req.session.success_message = "Message has been posted."
            }
            res.redirect("/users/show/"+req.body.receiver_id);
        } catch(err) {
            console.log(err);
        }
    }
    /*	DOCU: This function is responsible to validate and add a comment to a message from any user from the current user that is logged-in
	Owner: Cesar Francisco
	*/
    async comment_process(req, res){
        try {
            if(req.body.message == ''){
                req.session.error_comment = "Please enter a comment."
            } else {
                let user_id = req.session.user_id;
                await messages.comment_sent(req.body, user_id);
                req.session.success_comment = "Comment has been posted."
            }
            res.redirect("/dashboard");
        } catch(err) {
            console.log(err);
        }
    }
}
module.exports = new Messages;