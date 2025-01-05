const { connection } = require('../database/database')
 
class Task {
    static async createOne(task) {
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let { taskTypeId, userid, text, title, subject  } = task;
        let query = "INSERT INTO tasks (tasktype, userid, text, title, subject, created_at, update_at) "+
                    `VALUES('${taskTypeId}', '${userid}', '${text}', '${title}', '${subject}', '${date}', '${date}')`;

        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async getAll() {
        let query = `SELECT * FROM tasks`;
        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async getOne(id) {
        let query = `SELECT * FROM tasks WHERE id =` + id;
        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async updateOne(id, userData) {
        let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        let { taskTypeId, text, title, subject  } = userData;

        let query = `UPDATE tasks SET tasktype = ?, text  = ?, title  = ?, subject  = ?, update_at = '${date}' WHERE id = ${ id }`;

        let result;
        result = await connection.query(query, [ taskTypeId, text, title, subject ]).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
    static async deleteOne(id) {
        let query = `DELETE FROM tasks WHERE id =` + id;
        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }

    static async addTags(taskId, tags){
        let query = "INSERT INTO tasktotags (taskId, tagId) VALUES ";
              
        tags.forEach((element, index) => {
             query += `(${taskId}, ${element['id'] ?? element['insertId']})`;
             if(index < tags.length - 1 ){
                query += ', ';
             }
        });

        console.log(query);
        let result;
        result = await connection.query(query).then(result => {
            return result[0];
        }).catch(error => {
            return error;
        })
        return result;
    }
}


module.exports = Task;