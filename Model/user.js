const mongoose = require("mongoose");

//collection
//schema is a layout for object
const userSchema = new mongoose.Schema({
  // _id: mongoose.Types.ObjectId,
  name: {
    type: String
    // required: [true, "Name is required"] no require for name because it allows login function
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  pass: {
    type: String,
    required: [true, "Name is required"]
  }
});

// const registerSchema = new mongoose.Schema({
//   // _id: mongoose.Types.ObjectId,
//   name: {
//     type: String,
//     required: [true, "Name is required"]
//   },
//   email: {
//     type: String,
//     required: [true, "Email is required"]
//   },
//   pass: {
//     type: String,
//     required: [true, "Name is required"]
//   }
// });

// const loginSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, "Email is required"]
//   },
//   pass: {
//     type: String,
//     required: [true, "Name is required"]
//   }
// });

// module.exports = mongoose.model("users", { loginSchema, registerSchema }); //"user" to connect mongoose, doesnt matter its user or users written here, it will show users in the mongodb
module.exports = mongoose.model("users", userSchema); //"user" to connect mongoose, doesnt matter its user or users written here, it will show users in the mongodb
