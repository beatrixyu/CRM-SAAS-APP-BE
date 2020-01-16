const express = require("express");
// install in the backend=>cd Backend=> npm i express
//to install globle express, add sudo if cannot install=> sudo npm install -g expres
const app = express(); //express is a function
// const { registerSchema, loginSchema } = require("./Model/user");
const user = require("./Model/user");
const connectDB = require("./Config/db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let isLoggedIn = false;
const jwt = require("jsonwebtoken");
const jwtSecretKey = "Z!EX=JzRP6AY8H&Z";

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
//res.json() extracts the JSON-formatted data from the Response object and converts the data into a JavaScript object.

app.post("/register", async (req, res) => {
  //req and res, the postion of them cannot be changed
  //const { userName: panda, pass: 123456 } = req.body;
  let { name, email, pass } = req.body;
  /* body is an object
  req.body{
    userName:"test",
    pass:"123456"
  } here can be checked in the postman*/
  //check in the postman
  // res.json({ status: "success" });

  // Store hash in your password DB.
  pass = await bcrypt.hash(pass, saltRounds); //resource: https://www.npmjs.com/package/bcrypt

  const newUser = new user({
    //connect user.js
    //property name should be exactly same from the userSchema
    name, //  =name:name, we use short hand while setting variable names on the req.body and user schema
    email, // =email:email,
    pass //pass:pass
  });

  //check the mongodb server status
  console.log(name, email, pass);

  newUser.save(err => {
    if (err) {
      res.status(404);
      res.json({ status: "failed", message: err });
    } else {
      res.json({
        status: "success",
        message: "Congrats! you created a new account!"
      });
    }
  }); //save funtion is to save the info to database
  // res.json({ status: "success" }); //send back http request to the server
});

const checkAuth = (req, res) => {
  // check JWT
  const userToken = req.header("x-auth-token");
  if (!userToken) {
    return res.status(401).json({
      status: "false",
      message: "Token cannot be found, Authotization problem 5012"
    });
  }

  //use try and catch to identify the authotization problem and catch error
  try {
    jwt.verify(userToken, jwtSecretKey, (fail, decodedPayload) => {
      if (fail) {
        res.status(401).json({
          status: "failed",
          message: "Authotization problem 5013"
        });
      } else {
        res.userId = decodedPayload.id; //id is token id from JWT official website
        next(); //means Authotization is done
      }
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error });
  }
};

const signToken = id => {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: 3600000 }); //3600000 is one hour
  //JWT will ask client userID once not keep asking again and again
};

//Routing
app.get("/inbox", checkAuth, (req, res) => {
  //()=>checkAuth("bea") is a call back function to make this middleware function work not immediatelys
  // if (isLoggedIn) {
  res.json({ message: `Hello, your user id is ${res.userId}` }); //userId is id pf token
  // } else {
  //   res.json({
  //     message: "You are not welcomed!"
  //   });
  // }
  console.log(result);
});

app.post("/login", (req, res) => {
  const { email, pass } = req.body;

  user.findOne({ email }, (err, result) => {
    //use findOne to find a single object
    console.log(email, pass);
    if (err) {
      res.json({ status: "failed", message: err });
    } else if (!result) {
      res.json({
        status: "failed",
        message: "Your pass or email is wrong!"
      });
    } else {
      bcrypt.compare(pass, result.pass).then(async ifPassCorrect => {
        //result.pass is instead of hash
        if (ifPassCorrect) {
          isLoggedIn = true;

          // () => signToken();  to create the JWT token or
          const token = await signToken(result.id); //id of the client user
          res.json({
            status: "success",
            message: "Successfully login!",
            token
          });
        } else {
          res.json({
            status: "failed",
            message: "Your pass or email is not right!"
          });
        }
      });
    }
  });
});

//server gets awake
app.listen(port, () =>
  console.log(`CRM starts to work on port: http://localhost:${port}/`)
);

/* 1.build app.js to install expressjs (app) for listening the res,req ---> connect with postman 
2. build bd.js in the config folder and install mongoose to connect MongoDB server
3. build user.js in the Model folder to create userSchema to name, email, pass checking  

https://docs.google.com/document/d/1nYYxgqhuh17LlUpC1I4kcZRSkgQRJ2uoLQvlrTgLdVg/edit?usp=sharing
*/

/* JWT 
 
 1. nom install
 2. import require
 3.create serectkey ---can use password generator
 4.create tokenfunc
 5. set variable named 'isLoggedIn=false" but has to be set up to be let, cannot be const
6. call func login
7. postman to click login part
8. send data to mongodb and then get token 
9. copy and paste the token inside of the JWT page */
