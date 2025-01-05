const { connection } = require('../database/database')
 
class Tags {
    static async createOne(title) {

        let result = await this.getAll({ title: title });

        if(result.length){
            return result;
        }

        let query = "INSERT INTO tasktags ( name ) "+
        `VALUES('${ title }')`;

        result = await connection.query(query)
            .catch((error) => {
                return error;
            });
        return result;
    }
    static async getAll(params) {
        let query = `SELECT * FROM tasktags`;
        if("title" in params){
            query += ` WHERE name = '${ params.title }'`;
        }
        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async getOne(id) {
        let query = `SELECT * FROM tasktags WHERE id =` + id;
        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async updateOne(id, userData) {
        let { tagTittle  } = userData;

        let query = `UPDATE tasktags SET name WHERE id = ${ id }`;

        let result;
        result = await connection.query(query, [ tagTittle ]).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async deleteOne(id) {
        let query = `DELETE FROM tasktags WHERE id =` + id;
        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }


}


module.exports = Tags;