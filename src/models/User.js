const Model = require('./Model');
const mysql = require('mysql');

class User extends Model {
    /*	DOCU: This function is responsible for getting/inheriting the functions of a parent model
    Owner: Cesar Francisco
    */
    constructor() {
        super();
    }
    /*	DOCU: This function is responsible for adding a user to the database
    Owner: Cesar Francisco
    */
    async register_user(user) {
        try{
            let get_users = mysql.format(`SELECT count(*) as user_count FROM users`);
            let users = await this.query(get_users);
            if(users[0].user_count > 0){
                let user_level = 0;
                let values = [user['first_name'], user['last_name'], user['email'], user['password'], user_level];
                let sql_query = mysql.format(`INSERT INTO users
                                            (first_name, last_name, email, password, user_level_id, created_at, updated_at)
                                            VALUES (?, ?, ?, ?, ?, NOW(), NOW())`, values);
                let register_user_result = await this.query(sql_query);
                if(register_user_result){
                    return true;
                }
            } else {
                let user_level = 9;
                let values = [user['first_name'], user['last_name'], user['email'], user['password'], user_level];
                let sql_query = mysql.format(`INSERT INTO users
                                            (first_name, last_name, email, password, user_level_id, created_at, updated_at)
                                            VALUES (?, ?, ?, ?, ?, NOW(), NOW())`, values);
                let register_user_result = await this.query(sql_query);
                if(register_user_result){
                    return true;
                }
            }
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible for getting the email and password of a user from the database for signing-in
    Owner: Cesar Francisco
    */
    async signin_user(user) {
        try{
            let email = user['email'];
            let sql_query = mysql.format(`SELECT * FROM users WHERE email = ?`, email);
            let signin_user_result = await this.query(sql_query);
            if(signin_user_result){
                return true;
            }
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible getting all the users from the users table from the database
    Owner: Cesar Francisco
    */
    async get_all_users(){
        try{
            let sql_query = mysql.format(`SELECT users.id, first_name, last_name, email, DATE_FORMAT(users.created_at, '%b %D %Y') as created_at, user_level_name
                                        FROM users
                                        LEFT JOIN user_levels ON users.user_level_id = user_levels.id
                                        ORDER BY users.id ASC`);
            await this.query(sql_query);
            let get_all_users_result = await this.query(sql_query);
            if(get_all_users_result){
                return true;
            }
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible getting a user from the users table from the database by email
    Owner: Cesar Francisco
    */
    async get_user_by_email(email) {
        try {
            let sql_query = mysql.format(`SELECT count(*) as email_count FROM users WHERE email = ?`, email);
            let get_all_by_email_result = await this.query(sql_query);
            if(get_all_by_email_result){
                return true;
            }
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible for getting the user details from users table from the database by id
    Owner: Cesar Francisco
    */
    async get_user_by_id(id){
        try{
            let sql_query = mysql.format(`SELECT users.id, first_name, last_name, email, description, user_level_id, DATE_FORMAT(users.created_at, '%M %D %Y') as created_at
                                        FROM users
                                        LEFT JOIN user_levels ON users.user_level_id = user_levels.id
                                        WHERE users.id = ?`, id);
            return await this.query(sql_query);
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible for editing/updating the email, first name, and last name of a user from the database by id
    Owner: Cesar Francisco
    */
    async update_user(user, id){
        try{
            let values = [user['email'], user['first_name'], user['last_name'], id];
            let sql_query = mysql.format(`UPDATE users
                                        SET email = ?, first_name = ?, last_name = ?
                                        WHERE id = ?`, values);
            let update_user_result = await this.query(sql_query);
            if(update_user_result){
                return true;
            }
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible for editing/updating the password of a user from the database by id
    Owner: Cesar Francisco
    */
    async update_user_password(user, id){
        try{
            let values = [user['password'], id];
            let sql_query = mysql.format(`UPDATE users SET password = ? WHERE id = ?`, values);
            let update_user_password_result = await this.query(sql_query);
            if(update_user_password_result){
                return true;
            }
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible for editing/updating the description of a user from the database by id
    Owner: Cesar Francisco
    */
    async update_user_description(user, id){
        try{
            let values = [user['description'], id];
            let sql_query = mysql.format(`UPDATE users SET description = ? WHERE id = ?`, values);
            return await this.query(sql_query);
        } catch(err) {
            console.log("Error: ", err);
        }
    }
}
module.exports = new User;