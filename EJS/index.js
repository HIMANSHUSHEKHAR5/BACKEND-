const express = require("express");
const app = express();//its a functuion inside express.//
const path = require("path");// its a package which helps us to in many ways but in this case it helps us to join the path for views directory so that express can find views directory from anywhere.// 
const port = 8080;
app.use(express.static(path.join(__dirname,"/public/js")));
app.use(express.static(path.join(__dirname,"/public/css")));
// app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./views"));



app.set("view engine","ejs");// app.set() is a function in express,used to set something ,like in this it sets the view engine to ejs.//
app.set("views",path.join(__dirname,"/views"));// this line helps us to tell express that the views folder is always present in that folder from where our main or our server  "index.js" file is running.//



app.get("/",(req,res)=>{  //.get() bhi or ek function hai express kaa.//
    res.render("home");// here we can write "home.ejs" or we can write only "home"// 
});

app.get("/dice",(req,res)=>{
    let diceval = Math.floor(Math.random()*6)+1;
    res.render("dice.ejs",{diceval});
});

// app.get("/ig/:username",(req,res)=>{

//     const followers =["adi","bob","tom","jerry","joy","jumbo"];

//     let {username} = req.params;
//     res.render("ig.ejs",{username,followers});
// })




app.get("/ig/:username",(req,res)=>{
let {username} = req.params; 
const instadata = require("./data.json");//requiring the data//
const data = instadata[username];
if (data){
    res.render("ig.ejs",{data});
}else{
   res.render("error.ejs"); 
}
console.log(data);

});





app.listen(port,()=>{   //.listen() bhi ek or function hai express package kaa.//
    console.log("listening");
});