const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyName: String,
  location: String,
  username: { type: String, unique: true, required: true },
  email: String,
  password: String,
  websiteLink: { type: String, default: "" },
  gstNumber: { type: String, default: "" },
  about: { type: String, default: "" },
  profilePhoto: { type: String, default: "" },
});

CompanySchema.pre("save", async function (next) {
  try {
    // Check if username is taken by another employer
    const existingEmployer = await mongoose.models.employers.findOne({ username: this.username });
    if (existingEmployer) {
      return next(new Error("Username is already taken by an employer."));
    }

    // Check if username is taken by an employee
    const EmployeeModel = require("./Employee");
    const existingEmployee = await EmployeeModel.findOne({ username: this.username });
    if (existingEmployee) {
      return next(new Error("Username is already taken by an employee."));
    }
    
    next(); // Proceed if username is unique across both collections
  } catch (error) {
    next(error);
  }
});

const EmployerModel = mongoose.model("employers", CompanySchema);
module.exports = EmployerModel;
