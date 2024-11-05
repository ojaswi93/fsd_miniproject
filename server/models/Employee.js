const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true, required: true },
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

EmployeeSchema.pre("save", async function (next) {
  try {
    // Check if username is taken by another employee
    const existingEmployee = await mongoose.models.employees.findOne({ username: this.username });
    if (existingEmployee) {
      return next(new Error("Username is already taken by an employee."));
    }

    // Check if username is taken by an employer
    const EmployerModel = require("./Company");
    const existingEmployer = await EmployerModel.findOne({ username: this.username });
    if (existingEmployer) {
      return next(new Error("Username is already taken by an employer."));
    }

    next(); // Proceed if username is unique across both collections
  } catch (error) {
    next(error);
  }  
});

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
