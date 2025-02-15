const { connection } = require('../database/database')


class Session {
    static async setSession(data) {
        let query = `INSERT INTO sessions SET sessionToken = '${ data.token }', username = '${ data.username }', userId = ${ data.id }, createdAt = NOW()`;

        let result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async getSessionByToken(token) {
        let query = `SELECT * FROM sessions WHERE sessionToken = '${token}' LIMIT 1`;

        let result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async deleteSessionByToken(token) {
        let query = `DELETE FROM sessions WHERE sessionToken = '${token}'`;

        let result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        });
        return result;
    }
}

module.exports = Session;