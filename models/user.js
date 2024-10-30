

module.exports = class User{
    constructor(login, password){
        this.login = login;
        this.password = password;
    }
    async create(userdb){
        try{
            await userdb.insertOne(this);
        }  
        catch(error){
            console.log(error);
        }
        
    }
    static async getAll(userdb){
        return await userdb.find();
    }
}