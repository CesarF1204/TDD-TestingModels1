const Model = require('./Model');
const mysql = require('mysql');

class Message extends Model {
    /*	DOCU: This function is responsible for getting/inheriting the functions of a parent model
    Owner: Cesar Francisco
    */
    constructor() {
        super();
    }
    /*	DOCU: This function is responsible for adding a message to a any posted comments from messages table from the database
    Owner: Cesar Francisco
    */
    async message_sent(user, user_id){
        let values = [user_id, user['receiver_id'], user['message']];
        let sql_query = mysql.format(`INSERT INTO messages
                                    (user_id, receiver_id, message, created_at, updated_at)
                                    VALUES (?, ?, ?, NOW(), NOW())`, values);
        return await this.query(sql_query);
    }
    /*	DOCU: This function is responsible for getting all the messages from messages table from the database
    Owner: Cesar Francisco
    */
    async get_all_messages(){
        let sql_query = mysql.format(`SELECT *, DATE_FORMAT(messages.created_at, '%M %D %Y - %h:%m %p') as date_created_at, messages.id
                                    FROM messages
                                    LEFT JOIN users ON messages.user_id = users.id
                                    ORDER BY messages.created_at DESC`);
        return await this.query(sql_query);
    }
    /*	DOCU: This function is responsible for adding a comment on comments table from the database
    Owner: Cesar Francisco
    */
    async comment_sent(user, user_id){
        let values = [user_id, user['message_id'], user['comment']];
        let sql_query = mysql.format(`INSERT INTO comments
                                    (user_id, message_id, comment, created_at, updated_at)
                                    VALUES (?, ?, ?, NOW(), NOW())`, values);
        return await this.query(sql_query);
    }
    /*	DOCU: This function is responsible for getting all the comments from comments table from the database
    Owner: Cesar Francisco
    */
    async get_all_comments(){
        let sql_query = mysql.format(`SELECT *, DATE_FORMAT(comments.created_at, '%M %D %Y - %h:%m %p') as date_created_at
                                    FROM comments
                                    LEFT JOIN messages ON comments.message_id = messages.id
                                    LEFT JOIN users ON comments.user_id = users.id
                                    ORDER BY comments.created_at ASC`);
        return await this.query(sql_query);
    }
}
module.exports = new Message;