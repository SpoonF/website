function User(name, mail){
    this.name = name;
    this.mail = mail;
    this.dateCreated = new Date();
    this.printUserInfo = function(){
        console.log(`Имя: ${this.name} Почта: ${this.mail} Дата создания: ${this.dateCreated}`)
    } 
}
User.prototype.sayHi = function(){
    console.log(`Привет, меня зовут ${this.name}`);
}

module.exports = User;