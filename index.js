// //jshint esversion:6
// const express =require("express");
// const https =require("https");
// const bodyParser=require("body-parser");

// const app =express();

// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static('public'));

// // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// // https://openweathermap.org/img/wn/10d@2x.png

// app.get("/",function(req,res){
//     res.sendFile(__dirname+"/index.html");
// });

// app.post("/",function(req,res){
//     const API_Key="d2396c52eb92910ce970ec01a479f56d";
//     const query=req.body.city;
//     const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+API_Key+"&units=metric"
//     https.get(url,function(response){
//         response.on("data",function(data){
//             const weatherData=JSON.parse(data)
//             const temp=weatherData.main.temp
//             const desc=weatherData.weather[0].description
//             const icon=weatherData.weather[0].icon
//             const imgURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
//             res.write("<p>The weather is currently " +desc+"</p>")
//             res.write("<h1>Temperature at "+query+"is"+temp+"</h1>")
//             res.write("<img src="+imgURL+">")
//             res.send();
//     })
// })
// })

// app.listen(3000,function(){
//     console.log("Server Started at 3000");
// });

// index.js
//jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const API_Key = "d2396c52eb92910ce970ec01a479f56d";
    const query = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + API_Key + "&units=metric";

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            const resultHTML = `<p>The weather is currently ${desc}</p>
                                <h1>Temperature at ${query} is ${temp}</h1>
                                <img src="${imgURL}">`;

            res.send(resultHTML);
        });
    });
});

app.listen(3000, function () {
    console.log("Server Started at 3000");
});
