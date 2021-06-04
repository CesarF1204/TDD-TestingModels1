const Model = require('./Model');
const mysql = require('mysql');

class Admin extends Model {
    /*	DOCU: This function is responsible for getting/inheriting the functions of a parent model
    Owner: Cesar Francisco
    */
    constructor() {
        super();
    }
    /*	DOCU: This function is responsible for updating a user from the database
    Owner: Cesar Francisco
    */
    async user_edit(user, id) {
        try {
            let values = [user['email'], user['first_name'], user['last_name'], user['user_level_id'], id];
            let sql_query = mysql.format(`UPDATE users SET email = ?, first_name = ?, last_name = ?, user_level_id = ? WHERE id = ?`, values);
            return await this.query(sql_query);
        } catch(err) {
            console.log("Error: ", err);
        }
    }
    /*	DOCU: This function is responsible for deleting a user from the database
    Owner: Cesar Francisco
    */
    async user_delete(id){
        let sql_query = mysql.format(`DELETE FROM users WHERE users.id = ?`, id);
        return await this.query(sql_query);
    }
}
module.exports = new Admin;