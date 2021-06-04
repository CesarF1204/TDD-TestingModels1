const config = require("../config");
const mysql = require('mysql');
class Model {
    constructor() {
        this.connection = mysql.createConnection(config);
    }
    query(statement) {
        return new Promise((resolve, reject) => {
            this.connection.query(statement, function (err, result) {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(result);
                }
            });
        });
    }
}
module.exports = Model;