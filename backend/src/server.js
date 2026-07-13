//"test": "echo \"Error: no test specified\" && exit 1"

/*"scripts": {
    "dev": "nodemon server.js",//to continously update the code while im developing 
    "start": "node server.js"// to not continously  update and use this when final deployment
  },*/

import express from "express";
import notesroutes from "./routes/notesroutes.js";
import dotenv from "dotenv"; //to load environment variables from a .env file into process.env
import { connectDB } from "./config/db.js"; //to connect to the database and use the connection in the server  python .terminal.useenv
import rateLimiter from "./middlware/rateLimiter.js"; //import the rate limiter middleware
import cors from "cors"; //import the cors middleware to allow cross origin requests


dotenv.config();  //env file must be at the same as pckg.json file

const app = express();
const port = process.env.port || 5001;



app.use(cors());//make sure its before sending any responds {origin:"http://localhost:5173",}

//middleware
app.use(express.json());//this help me access title and content fro controllerfile without it i cannot access them
  //middleware make sure to add it before the routes (notesroutes)this will allow us to parse json data from the request body

app.use(rateLimiter) //put it also before we send the respond and make sure its imported //this makes sure if user can send requests or we should send an error response
  //middleware method 2
// app.use((req,res,next)=>{
    
//     console.log("we just got new request");
//     console.log(`request method is ${req.method} & request url is ${req.url}`);
//     next(); //this will pass the request
// })


//middleware is sth that the server does sometimes when it receives a request and before it sends a response back to the client. It can be used to modify the request or response objects, or to perform some other action before the request is handled by the route handler.

//sends the response back
app.use("/api/notes",notesroutes);

connectDB().then(()=>{  // it connects to db first then starts the server 

    app.listen(port, () => {
        console.log("server started on port ", port)
    });
    

})

 






/*
const express = require("express");
const app = express();

app.use("/api/notes",notesroutes);




router.listen(3000,()=>{
    console.log("server started on port 3000")
});
*/