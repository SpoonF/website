const MongoClinet = require("mongodb").MongoClient;

function createToken() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

class dbconnect {
    constructor() {
        this.client = new MongoClinet("mongodb://127.0.0.1:27017/");
    }
    createUser(name, age){
        this.client.connect().then(mongoClient=>{
            console.log("Подключение установлено 1");
            console.log(mongoClient.options.dbName);
            mongoClient.close().then(() => {
                console.log("Подключение зыкрыто 1");
            })
        })
    }
    async updateUser(){
        try{
            await this.clinet.connect();
            
            // Взаимодействыие с бд
            const db = this.client.db("task_managerdb");
            const ping = await db.command({ping: 1});
            const collection = db.collection("users");
            const result = await collection.find({login: "admin"}).toArray();
            // const count = await collection.countDocuments();
            console.log("Подключение с серевером успешно установлено");
            console.log(result);
        }
        catch(err){
            console.log(err);
        } finally {
            await this.client.close();
            console.log("Подключение закрыто 2");
        }
    }
    // authorizationUser(data){
    //     var json = [];
    //     this.client.connect().then(mclient=>{
    //         const db = mclient.db("task_managerdb");
    //         const users = db.collection("users");
    //         const users_token = db.collection("users_token");

    //         const user_data = users_token.findOne({user_agent: data["user_agent"], token: data["token"]});
    //         if(user_data){
    //             console.log(user_data);
    //             console.log("Авторизация по токену прошла успешно");
    //             json["href"] = "/";
    //         }else if(!user_data){
    //             const user = users.findOne({login: data["login"], password: data["password"]});
    //             if(user){
    //                 const token = createToken();
    //                 users_token.insertOne({user_id: user["_id"],token: token, user_agent: data["useragent"]});
    //                 console.log("Авторизация с созданием токена прошла успещно");
    //                 json["token"] = token;
    //             }else{
    //                 console.log("Авторизация провалена");
    //                 json["error"] = "Пользователь с такими данными не найден";
    //             }
    //         }
    //         mclient.close().then(() => {
    //             console.log("Подключение закрыто 2");
    //             console.log(json);
    //             return json;
    //         })
            
    //     })
        
    // }
    async authorizationUser(data, result){
        var json = [];
        console.log(data);
        try{
            await this.client.connect();

            const db = this.client.db("task_managerdb");
            const users = db.collection("users");
            const users_token = db.collection("users_token");

            const user_data = await users_token.findOne({user_agent: data["user_agent"], token: data["token"]});
            if(user_data){
                console.log(user_data);
                console.log("Авторизация по токену прошла успешно");
                json["href"] = "/";
            }else if(!user_data){
                const user = await users.findOne({login: data["login"], password: data["password"]});
                if(user){
                    const token = createToken();
                    await users_token.insertOne({user_id: user["_id"],token: token, user_agent: data["useragent"]});
                    console.log("Авторизация с созданием токена прошла успещно");
                    json["token"] = token;
                }else{
                    console.log("Авторизация провалена");
                    json["error"] = "Пользователь с такими данными не найден";
                }
            }
        }
        catch(err){
            console.log(err);
        } finally {
            await this.client.close();
            console.log("Подключение закрыто 2");
            console.log(json);
            return json;
        }
    }
}
        
module.exports = dbconnect;