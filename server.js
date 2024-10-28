const http = require("http");
const fs = require("fs");


function pageResponse(req){
    switch (req.url.substring(1)) {
        case "" :
            return "index.html";
        case "home" :
            return "index.html";
        default:
            return req.url.substring(1);
    }
}

const server = http.createServer(async (req,res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8;");
    // pageResponse(req,res);
    if(req.url === "/user"){
        let data = "";
        req.on("data",chunk => {
            data += chunk;
        });
        req.on("end",() => {
            console.log(JSON.parse(data));
            res.end("Данные успещно получены");
        })
    }else if(req.url === "/data"){
        const buffer = [];
        for await (const chunk of req){
            buffer.push(chunk);
        }
        const data = JSON.parse(Buffer.concat(buffer).toString());
        console.log(buffer);
        console.log(data);
        res.end("Данные успешно получены");
    }else if(req.url === "/create-user"){
        let userName = "";
        let age = 0;
        let buffer = "";
        for await (const chunk of req){
            buffer += chunk;
        }
        const params = buffer.split("&");
        for(param of params){
            const [paramName, paramValue] = param.split("=");
            if(paramName === "name") userName = paramValue;
            if(paramName === "age") age = paramValue;
        }
        // const data = JSON.parse(Buffer.concat(buffer).toString());
        // userName = data['name'];
        // age = data['age'];
        console.log(userName);
        console.log(age);
        res.end("Данные успешно получены");
    }else if(req.url === "/about"){
        fs.readFile("about.html", (error, data) => res.end(data))
    }
    else{
        fs.readFile("index.html", (error, data) => res.end(data))
        // const filePath = pageResponse(req);
        // fs.access(filePath, fs.constants.R_OK, err => {
        //     if(err){
        //         res.statusCode = 404;
        //         res.end("Resourse not found!");
        //     }else{
        //         fs.createReadStream(filePath).pipe(res);
        //     }
        // });
    }
    
});
server.listen(3000,function(){
    console.log("Сервер запущен Порт: 3000");
});
