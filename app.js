const express = require("express");
// install in the backend=>cd Backend=> npm i express
//to install globle express, add sudo if cannot install=> sudo npm install -g expres
const app = express();
//express is a function

app.use(express.json());
/* 
 express.json() is a built -in middleware function in Express.It parses incoming requests with JSON payloads and is based on body - parser.
Returns middleware that only parses JSON and only looks at requests where the Content - Type header matches the type option.
 */
const port = process.env.PORT || 5000;
// In many environments(e.g.Heroku), and as a convention, you can set the environment variable PORT to tell your web server what port to listen on.

app.get("/", (req, res) => res.json({ message: "hello class" }));

app.post("/register", (req, res) => {
  //req and res, the postion of them cannot be changed
  //  const { userName: panda, pass: 123456 } = req.body;

  const { userName, pass } = req.body;
  /*     body is an object
  req.body{
    userName:"panda",
    pass:"123456"
  } */
  console.log(userName, pass);
  res.json({ status: "success" });
});

app.listen(port, () =>
  console.log(`CRM starts to work on port: http://localhost:${port}/`)
);
