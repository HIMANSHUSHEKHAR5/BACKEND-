const express = require("express");
const app =express();

console.dir(app);

let port =8080;

app.listen(port,()=>{
    console.log(`app is listening on port port:${port}`)
})
app.use((req,res)=>{
    // console.log(req);
    console.log("request recieved");
    res.send("this is a basic response");

})

