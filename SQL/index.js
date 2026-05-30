


const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const {uuidv4} = require("uuidv4");
const path = require("path");
const methodOverride = require("method-override");
const port = 8080;



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"./views"));


app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));



// *****************************creating connection with sql *********************************************************

const Connection = mysql.createConnection({     // Create the connection to database
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password:"himanshut@509"
});
//***********************************************************************************************************************
// **********************************************************************************************************

let  getRandomUser = () => {                          //  ye faker ka functions ka  help se RANDOMNUSERS generate karwayga 
  return[
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
    faker.phone.number()
  ]
};


app.get("/",(req,res) =>{
let q ="SELECT COUNT(*) FROM user";

try{
    Connection.query(q,(err,result) =>{       // it help us to create query and run sql queries from nodejs.
    if(err) throw err;                                       // agar error hoga to  usko throw karega 
    let count = result[0]["COUNT(*)"]; 
    console.log({count});
    res.render("home.ejs",{count});                               //error nhi hoga to result print krega 
});
}catch(err){                                             // error jo throw huaa hogaa usko catch krega or console krwa dega 
    console.log(err);
    res.send("some error in DB");
};
});


// *****************************************************************************************************************************
app.get("/user",(req,res) =>{
let q ="SELECT id,user_name,email,mob FROM user";

try{
    Connection.query(q,(err,users) =>{       // it help us to create query and run sql queries from nodejs.
    if(err) throw err;  
                                       // agar error hoga to  usko throw karega 
    res.render("showusers.ejs",{users});                               //error nhi hoga to result print krega 
});
}catch(err){                                             // error jo throw huaa hogaa usko catch krega or console krwa dega 
    console.log(err);
    res.send("some error in DB");
};
});
// **************************************************************************************************************************************************************************************************


app.get("/user/:id/edit",(req,res) =>{

let {id} = req.params;
let q =`SELECT * FROM user WHERE id="${id}"`;
try{
    Connection.query(q,(err,result) =>{       // it help us to create query and run sql queries from nodejs.
    if(err) throw err;  
    let user = result[0];  
    console.log({user});                                   // agar error hoga to  usko throw karega 
    res.render("edit.ejs",{user});                               //error nhi hoga to result print krega 
});
}catch(err){                                             // error jo throw huaa hogaa usko catch krega or console krwa dega 
    console.log(err);
    res.send("some error in DB");
};
});


// *********************************************************************************************************************************************************************************

app.patch("/user/:id/edit",(req,res) =>{
  let {id} = req.params;
  let {password:formpass,user_name:newUsername} =req.body;
  let q = `SELECT * FROM user WHERE id="${id}"`;

 
try{
    Connection.query(q,(err,result) =>{       // it help us to create query and run sql queries from nodejs.
    console.log(result);
      if(err) throw err;  
    let user = result[0];  
    if(formpass !=user.password){
      res.send("incorrect passwword please try again");
    }else{
      let q2 = `UPDATE user SET user_name="${newUsername}" WHERE id="${id}"`;
      Connection.query(q2,(err,result) =>{
        if(err) throw err;
        res.redirect("/user");
      })
    }                                // agar error hoga to  usko throw karega                               //error nhi hoga to result print krega 
});
}catch(err){                                             // error jo throw huaa hogaa usko catch krega or console krwa dega 
    console.log(err);
    res.send("some error in DB");
};
});
// ********************************************************************************************************************************
app.get("/user/add",(req,res) =>{
try{
     res.render("adduser.ejs");                                                  //error nhi hoga to result print krega
}catch(err){                                             // error jo throw huaa hogaa usko catch krega or console krwa dega 
    console.log(err);
};
});

  //*******************************************************************************************************************************
  app.post("/user",(req,res) =>{
    let {id,user_name,email,password,mob} = req.body;
    let q = "INSERT INTO user (id,user_name,email,password,mob) VALUES (?,?,?,?,?)"; 
   let data = [id,user_name,email,password,mob];
   try{
    Connection.query(q,data,( err,result) =>{  
      console.log(result);                             
    if(err) throw err;   
    res.redirect("/user");                                    
});
}catch(err){                                           
    console.log(err);
};
});
// ***********************************************************************************************************************************************************************************
app.get("/user/:id/delete",(req,res) =>{  
  const {id}= req.params;
try{
    res.render("deleteuser.ejs",{id}) ;  
}catch(err){                                          
    console.log(err);
};
});



// ***************************************************************************************************************************************


app.post("/user/:id/delete",(req,res) =>{
  let {id}=req.params;
  const{email:formemail,password:formpass}=req.body;
  let q = `SELECT * FROM user WHERE id="${id}"`;
  

try{
  Connection.query(q,(err,result) =>{
     if(err) throw err;
     let user =result[0];
    if(formemail!=user.email || formpass !=user.password) {
        console.log("wrong details");
      }else{
          let q2 = `DELETE FROM user WHERE id="${id}"`;
            
        Connection.query(q2,(err,result) =>{
          console.log("deleted");
          res.redirect("/user");

        })
          


    
    }

  })
   }catch(err){
      console.log(err);
}
 

})
// ***************************************************************************************************************************************

// Connection.end();
// *************************************************************************************************************************************************************************************
app.listen(port,(req,res) =>{
    console.log(`listening on port:${port}`);
})                                                           

// *****************************show table query***********************************************************************************************************************

// let q = "SHOW TABLES";                        // ye show table ka qery ke liye hai                // ek variable me ke form me use krne se baddhiya haota hai

// try{
//     Connection.query(q,(err,result) =>{       // it help us to create query and run sql queries from node.js.
//     if(err) throw err;                                       // agar error hoga to  usko throw karega 
//     console.log(result[1]);                                   //error nhi hoga to result print krega
    
// });
// }catch(err){                                             // error jo throw huaa hogaa usko catch krega or console krwa dega 
//     console.log(err);
// };



// // ******************************************************************************************************************************************
//  let i = "INSERT INTO user (id,user_name,email,password,mob) VALUES ?";  // ye insert kaa query ke liye  hai.
// let data  =[];
// for (let i =1 ;i<=100;i++){                                       // ye for loop use karegaa or gerRandonUser() ko call krte rahegas or  data[] mein push karwaate rahegaa.
//     data.push(getRandomUser());  
//     console.log(getRandomUser());
// }

//  try{
//     Connection.query(i,[data],(err,result) => {       // it help us to create query and run sql queries from node.js.
//      if(err) throw err;                                       // agar error hoga to  usko throw karega 
//      console.log(result);                                   //error nhi hoga to result print krega
    
//  });
//  }catch(err){                                             // error jo throw huaa hogaa usko catch krega or console krwa dega 
//      console.log(err);
//  };
//                                           // ye connection stop krtaa hai mtlb ki jb query ka kaam khatam bho jaataa hai hai to ye response ko rokta hai hai nhi to 
//                                                               //response ke cursor atkaa rehtaa hai .

// *******************************************************************************************************************************************************************************************

// ls "/c/Program Files/MySQL"//

// C:\Program Files\MySQL\MySQL Server 8.0\bin // add to path in evironment variable.

 
