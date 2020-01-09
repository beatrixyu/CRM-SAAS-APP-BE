const express = require("express");
// install in the backend=>cd Backend=> npm i express
//to install globle express, add sudo if cannot install=> sudo npm install -g expres
const app = express(); //express is a function
const user = require("./Model/user");
const connectDB = require("./Config/db");
//DB Connection
connectDB();

app.use(express.json()); //body parse middleware of Express
/* 
 express.json() is a built -in middleware function.It parses incoming requests with JSON payloads and is based on body - parser.
Returns middleware that only parses JSON and only looks at requests where the Content - Type header matches the type option.
 */
const port = process.env.PORT || 5000;
// process.env.PORT: In many environments(e.g.Heroku), and as a convention, you can set the environment variable PORT to tell your web server what port to listen on.

app.get("/", (req, res) => res.json({ message: "hello class" }));
//it is router to get some reaction/feedback get send data as json back from server to client

app.post("/register", (req, res) => {
  //req and res, the postion of them cannot be changed
  //const { userName: panda, pass: 123456 } = req.body;
  const { name, email, pass } = req.body;
  console.log(name, email, pass);
  /* body is an object
  req.body{
    userName:"panda",
    pass:"123456"
  } here can be checked in the postman*/
  //check in the postman
  // res.json({ status: "success" });

  const newUser = new user({
    //connect user.js
    //property name should be exactly same from the userSchema
    name, //  =name:name, we use short hand while setting variable names on the req.body and user schema
    email, // =email:email,
    pass //pass:pass
  });
  //check the mongodb server status
  console.log(name, email, pass);

  newUser.save();
  res.json({ status: "success" });
});

//server gets awake
app.listen(port, () =>
  console.log(`CRM starts to work on port: http://localhost:${port}/`)
);

/* 1.build app.js to install expressjs (app) for listening the res,req ---> connect with postman 
2. build bd.js in the config folder and install mongoose to connect MongoDB server
3. build user.js in the Model folder to create userSchema to name, email, pass checking  */
