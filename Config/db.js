const mongoose = require("mongoose");

//build a new cluster ==> choose AWS ==> Frankfurt

//click "connect" to create user and set up ip address

//change the ip address to 0.0.0.0, it is actually specifies all IP addresses on all interfaces on the systems. It's a non-routable meta-address that's used to define an unknown or invalid target.

//get the keyword

//then connect your application (second choice)

//go to cluster ---> click collections ---> click "add my all data" ---> input project name and create an exact parameter

const db =
  "mongodb+srv://admin:dci123@cluster0-4ynck.mongodb.net/CRM_App?retryWrites=true&w=majority";

//delete "test" and add "project name" into the link
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log("mongo altas server is ready");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
