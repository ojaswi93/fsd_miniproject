const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  lastname: { type: String, default: "" },
  location: { type: String, default: "" },
  gender: { type: String, default: "" },
  age: { type: Number, default: null },
  aadhar: { type: String, default: "" },
  about: { type: String, default: "" },
  profilePhoto: { type: String, default: "" }, 
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
