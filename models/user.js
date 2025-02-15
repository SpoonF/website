const { connection } = require('../database/database')
 
class User {
    static async createOne(user) {
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let { username, email, password } = user;
        let query = `INSERT INTO users (username, email, password, update_at, created_at) VALUES('${username}', '${email}', '${password}', '${date}', '${date}')`;

        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async getAll() {
        let query = `SELECT * FROM users`;
        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async getUserById(id) {
        let query = `SELECT * FROM users WHERE id =` + id;
        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async getUser(data = null) {

        let query = `SELECT * FROM users`;

        if("where" in data) {
            query += ` WHERE `;
            query += data.where?.username ? `username = '${ data.where?.username }' `: null;
        }

        query += 'LIMIT 1';

        let result;
        result = await connection.query(query).then(result => {
            return result[0][0];
        }).catch(error => {
            return error;
        })
        return result;
    }

    static async updateOne(id, userData) {
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let { username, email, password } = userData;

        let query = `UPDATE users SET username = ?, email =  ?, email =  ?, update_at = '${date}' WHERE id = ${ id }`;


        let result;
        result = await connection.query(query, [ username, email, password ]).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async deleteOne(id) {
        let query = `DELETE FROM users WHERE id =` + id;
        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
}


module.exports = User;